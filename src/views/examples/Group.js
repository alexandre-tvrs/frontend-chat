import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Label } from "reactstrap";
import Header from "components/Headers/Header";
import { Col, Row, Form, Input, Button } from "reactstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Modal from '@mui/material/Modal';
import DatePicker from 'react-datepicker';

const Group = () => {

  useEffect(() => {
    handleGetUser()
    handleGetGroup()
    handleGetProfs()
  }, [])

  const [group, setGroup] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profs, setProfs] = useState(null)
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const navigate = useNavigate()

  const id = localStorage.getItem("id");

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  const params = useParams()

  const id_grupo = localStorage.getItem("id_grupo") == null ? localStorage.getItem("id_grupo") : params.id 

  const formatDate = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const formattedDate = formatDate(selectedDate);

  const handleGetProfs = async () => {
    const response = await fetch(`http://localhost:8000/profs/`)
    const profs = await response.json()
    setProfs(profs)
  }
  
  const handleGetGroupProf = (profs) => {
    return !profs ? null : profs.map((prop) => {
      if (prop.id == group?.id_professor) {
        return (
          <Input
            type="text"
            name="prof"
            id="prof"
            disabled
            defaultValue={prop?.nome}
          >
          </Input>
        )
      }
    })
  }

  const handleGetGroup = async () => {
    const response = await fetch(`http://localhost:8000/groups/${id_grupo}/`)
    const group = await response.json()
    setGroup(group)
  }
  
  const handleCreateTask = async (e) => {
      e.preventDefault();
      const form = new FormData()
      form.append("titulo", e.target.titulo.value);
      form.append("descricao", e.target.descricao.value);
      form.append("dataEntrega", e.target.dataEntrega.value);
      form.append("group_id", id_grupo);
      const response = await fetch(`http://localhost:8000/timeline/create/`, {
        method: "POST",
        body: form
      })

      if (response.ok) {
          alert("Nova task adicionada com sucesso!")
          navigate(`/admin/group/${id_grupo}/timeline`)
        }
      }

  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    const form = new FormData()
    form.append("nome", e.target.nome.value);
    form.append("descricao", e.target.descricao.value);
    form.append("img_group", e.target.img.files[0]);
    form.append("id_professor", e.target.prof.value) ? form.append("id_professor", e.target.prof.value) : form.append("id_professor", null);
    const response = await fetch(`http://localhost:8000/groups/${id_grupo}/`, {
      method: "PUT",
      body: form
    })
    if (response.ok) {
      window.location.reload()
    }
  }
  
  const handleGetGroupUsers = (users) => {
    return !users ? null : users.map((prop) => {
      return (
          <Col md="4">
            <Input
              type="text"
              name="nome"
              id="nome"
              disabled
              defaultValue={prop?.nome}
            >
            </Input>
          </Col>
      )
    })
  }
  const groupBox = (group) => {
    return ( 
      <Card sx={{ maxWidth: 1575, minWidth: 1575, minHeight: 880}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="420"
            image={group?.img_group}
            alt="..."
          />    
          <Form onSubmit={handleUpdateGroup}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Row>
                  <Col md="9">
                    <Label for="nome">Nome do grupo</Label>
                    <Input 
                      type="text"
                      name="nome"
                      id="nome"
                      defaultValue={group?.nome}
                      style={{border: "none", fontSize: 40, fontWeight: "bold"}}
                      disabled={!isEditing}
                    />
                  </Col>
                  <Col md="3" style={{marginTop: 55}}>
                    <Button
                      
                      color="danger"
                      href={`/admin/group/${group?.id}/chat`}
                    >
                      Chat
                    </Button>
                    {user?.tipo_usuario == 1 ? 
                    (
                      <Button
                      color="info"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                    ) : (<Button
                    color="info"
                    href={`/admin/group/${group?.id}/timeline`}
                    >
                    Timeline
                    </Button>)}
                    {user?.tipo_usuario == 2 ? (
                      <Button
                        color="success"
                        onClick={handleOpen}
                      >
                        Adicionar Task
                      </Button>

                    ):null}
                    {isEditing ? (
                      <Button
                        color="success"
                        type="submit"
                      >
                        Salvar
                      </Button>
                    ) : null}
                  </Col>
                </Row>            
              </Typography>
                <Row>
                  <Col md="12">
                    <Typography variant="body2" color="text.secondary" component="div">
                      <Label for="descricao">Descrição</Label>
                      <Input 
                        defaultValue={group?.descricao}
                        style={{border: "none", fontSize: 20, fontWeight: "bold"}}
                        disabled={!isEditing}
                        name="descricao"
                      />
                    </Typography>
                  </Col>
                </Row>
                <br />
                <Typography gutterBottom variant="h8" component="div">
                  <Row>
                    <Col md="6">
                    <Label for="img_grupo">Imagem do Grupo</Label>
                      <Input
                        type="file"
                        name="img"
                        id="img"
                        disabled={!isEditing}
                      />
                    </Col>
                    <Col md="6">
                    <Label for="prof">Professor orientador</Label>
                      {handleGetGroupProf(profs)}
                    </Col>
                  </Row>
                </Typography>
          <br />
            <Typography gutterBottom variant="h8" component="div">
              <Label>Membros do grupo</Label>
              <Row>
                {handleGetGroupUsers(group?.users)}
              </Row>
            </Typography>
        </CardContent>
        </Form>
      </CardActionArea>
    </Card>
    )
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
            <Form onSubmit={handleCreateTask}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Label for="tituloTask">Titulo da Task</Label>
              <Input
                placeholder="Título"
                name="titulo"
                required
              />
              <Label for="descricaoTask">Descrição da Task</Label>
              <Input
                placeholder="Descrição"
                name="descricao"
                required
              />
              <Label for="dataEntrega">Data de entrega</Label>
              <br />
              <DatePicker
                placeholderText="Data da Entrega"
                required
                dateFormat="dd/MM/yyyy"
                selected={selectedDate}
                onChange={handleDateChange}
                className="form-control"
                />
              <input type="hidden" name="dataEntrega" value={formattedDate} />
            </Typography>

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

            </Form>
          </Box>
        </Modal>
      </div>
    );
  }


  return (
    <>
    <Header />
    <Container fluid style={{paddingTop: 25}}>
        <Row>
          {groupBox(group)}
        </Row>
    </Container>
    {createModal()}
    </>
  );
};

export default Group;
