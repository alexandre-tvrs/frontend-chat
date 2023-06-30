import React, {useEffect, useState} from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import Header from 'components/Headers/Header';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { Label } from "reactstrap";
import { Form, Input, Button } from "reactstrap";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const clock = {
  icon: <FontAwesomeIcon icon={faClock} />,
  iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
};

const check = {
  icon: <FontAwesomeIcon icon={faCheck} />,
  iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
};

function Timeline() {
  const params = useParams()
  const id = localStorage.getItem("id")
  const id_grupo = localStorage.getItem("id_grupo") == null ? localStorage.getItem("id_grupo") : params.id 
  const [modalTask, setModalTask] = useState(null)
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    resultJson()
    handleGetUser()
  }, [])

  const resultJson = async () => {
    const response = await fetch(`http://127.0.0.1:8000/groups/${id_grupo}/timeline/`)
    const list = await response.json()
    setTasks(list)
  }

  const updateModal = async (e) => {
    e.preventDefault()
    handleOpen()
    setModalTask(e.target.id.value)
  }

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const form = new FormData()
    form.append('id', e.target.id.value)
    form.append('arquivo', e.target.arquivo.files[0])
    form.append('comentario', e.target.comentario.value)
    form.append('entregueBy' , id)
    const response = await fetch(`http://localhost:8000/timeline/update/`, {
      method: "POST",
      body: form
    })

    if (response.ok) {
        alert("Task finalziada com sucesso!")
        window.location.reload()
      }
    }

  const createModal = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adicione uma task:
            </Typography>
            <Form onSubmit={handleUpdateTask}>
              <Input type='hidden' name='id' value={modalTask} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Label for="arquivoTask">Inserir arquivo para entrega</Label>
              <Input
                type='file'
                name="arquivo"
                required
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Label for="arquivoTask">Inserir comentário para entrega</Label>
              <Input
                type='textarea'
                name="comentario"
                required
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <br />
            <Button
              color="danger"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              type="submit"
            >
              Salvar
            </Button>
            </Typography>
            </Form>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <>
      <Header />
      <VerticalTimeline>
        {tasks.map((t, i) => {
          const contentStyle = { background: 'rgb(144, 215, 255)' }
          const arrowStyle = { borderRight: '7px solid rgb(144, 215, 255)' }
          const dataFormatada = new Date(t?.dataEntrega).toLocaleString(
            "pt-BR",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
          );
          return (
            <VerticalTimelineElement
              key={i}
              className="vertical-timeline-element--work"
              contentStyle={contentStyle}
              contentArrowStyle={arrowStyle}
              date={dataFormatada}
              {...t.entregue == true? check : clock}
            >
              <Form onSubmit={updateModal}>
              <Input type='hidden' name='id' value={t.id} />
              {t.entregue == true ? (<React.Fragment>
                <h2 className="vertical-timeline-element-title pb-3">Task entregue</h2>
              </React.Fragment>) : null}
              {t.titulo ? (
                <React.Fragment>
                  <h3 className="vertical-timeline-element-title">{t.titulo}</h3>
                  {t.descricao && <p>{t.descricao}</p>}
                </React.Fragment>
              ) : null}
              {t.entregue == true ? (
                <React.Fragment>
                  <h3 className="vertical-timeline-element-title pt-4">Autor:</h3>
                  {t.entregueBy != null ? t.entregueBy.nome && <p>{t.entregueBy.nome}</p> : <p>Usuário deletado</p>}
                  <h3 className="vertical-timeline-element-title pt-4">Comentário:</h3>
                  {t.comentario && <p>{t.comentario}</p>}
                  <h3 className="vertical-timeline-element-title pt-4 pb-2">Arquivo:</h3>
                  <Button
                    color="success"
                    download
                    href={`${t.arquivo}`}
                  >
                    Download Arquivo  
                    </Button>
                  </React.Fragment>
              ) : null}
              <br />
              {user?.tipo_usuario == 1 && t.entregue == false? (
                <Button
                  color="info"
                  type='submit'
                  >
                  Entregar
                </Button>
              ) : null}
              </Form>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>

      {createModal()}
    </>
  );
}

export default Timeline;
