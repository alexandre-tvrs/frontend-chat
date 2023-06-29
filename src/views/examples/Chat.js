import Header from "components/Headers/Header";
import { useParams } from "react-router-dom";
import { VerticalTimeline,  VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, {useEffect, useState} from 'react';
import { Input, Button, Form } from "reactstrap";

const Login = () => {

  const params = useParams()
  const id_grupo = localStorage.getItem("id_grupo") == null ? localStorage.getItem("id_grupo") : params.id
  const id = localStorage.getItem("id")
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState(null)

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  useEffect(() => {
    handleGetUser()
    handleGetHistory()
  }, [])

  const handleGetHistory = async () => {
    const response = await fetch(`http://localhost:8000/groups/${id_grupo}/messages/`)
    const messages = await response.json()
    setMessages(messages)
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const form = new FormData()
    form.append('user', user.id)
    form.append('group', id_grupo)
    form.append('message', e.target.mensagem.value)
    const response = await fetch(`http://localhost:8000/messages/`, {
      method: "POST",
      body: form
    })
    if (response.ok) {
      window.location.reload()
    }
  }

  const handleMessage = (messages) => {
    const contentStyle = { background: 'rgb(144, 215, 255)' }
    const arrowStyle = { borderRight: '7px solid rgb(144, 215, 255)' }
    return !messages ? null : messages.map((prop, key) => {
      return (
        <VerticalTimelineElement
          key={key}
          className="vertical-timeline-element--work"
          contentStyle={contentStyle}
          contentArrowStyle={arrowStyle}
          position={prop?.user.id == user?.id ? "right" : "left"}
        >
          <React.Fragment
          >
              <img style={{backgroundImage: `url(${prop.user?.img_usuario})`, width:"36px", height:"36px", backgroundSize:"cover", backgroundPosition:"left", borderRadius:"50%"}} />
            <h3 className="vertical-timeline-element-title">{prop.user.nome}</h3>
                  {prop.message && <p>"{prop.message}"</p>}
          </React.Fragment>
        </VerticalTimelineElement>
      )
  })
}


  return (
    <>
      <Header />
      <VerticalTimeline>
        {handleMessage(messages)}
      </VerticalTimeline>
      <div className="text-center" style={{position: "absolute", height: "30%", width: "70%", marginLeft: "15%", marginTop: "5%"}}>
      <Form onSubmit={handleSendMessage}>
        <div className="form-group static">
          <label>Mensagem</label>
          <Input className="form-control" type="textarea" name="mensagem" placeholder="Digite sua mensagem" />

        </div>
        <Button type="submit" className="btn btn-primary">Enviar</Button>
      </Form>
      </div>
    </>
  );
};

export default Login;
