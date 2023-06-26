import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Label } from "reactstrap";
import Header from "components/Headers/Header";
import { Col, Row, Form, Input, Button } from "reactstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Group = () => {

  useEffect(() => {
    handleGetUser()
    handleGetGroup()
    handleGetProf()
    handleGetUsers()
  }, [])

  const [group, setGroup] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profs, setProfs] = useState(null)
  const [users, setUsers] = useState(null)
  const [user, setUser] = useState(null)

  const id = localStorage.getItem("id");

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  const params = useParams()

  const id_grupo = localStorage.getItem("id_grupo") ? localStorage.getItem("id_grupo") : params.id 

  const handleGetProf = async () => {
    const response = await fetch(`http://localhost:8000/profs/`)
    const profs = await response.json()
    setProfs(profs)
  }

  const handleGetUsers = async () => {
    const response = await fetch(`http://localhost:8000/alunos/`)
    const users = await response.json()
    setUsers(users)
  }

  const handleGetGroup = async () => {
    const response = await fetch(`http://localhost:8000/groups/${id_grupo}/`)
    const group = await response.json()
    setGroup(group)
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
    if (e.target.aluno2.value != "") {
      handleUpdateUser2Group(e)
    } else if (e.target.aluno3.value != "") {
      handleUpdateUser3Group(e)
    }
    if (response.ok) {
      alert("Grupo atualizado com sucesso!")
      window.location.reload()
    }
  }

  const handleUsers = (users) => {
    return !users ? null : users.map((prop) => {
      if (user?.id != prop.id) {
        return (
          <option value={prop.id}>{prop.nome}</option>
        )
      }
    })
  }

  const handleProfs = (profs) => {
    return !profs ? null : profs.map((prop) => {
      if (prop.id == group?.id_professor) {
        return (
          <option value={prop.id} selected>{prop.nome}</option>
        )
      }
      return (
        <option value={prop.id}>{prop.nome}</option>
      )
    })
  }

  const handleUpdateUser2Group = async (e) => {
    e.preventDefault();
    const form = new FormData()
    form.append("id_grupo", id_grupo)
    form.append("nome", users?.find(user => user.id == e.target.aluno2.value).nome)
    form.append("email", users?.find(user => user.id == e.target.aluno2.value).email)
    form.append("registro", users?.find(user => user.id == e.target.aluno2.value).registro)
    const response = fetch(`http://localhost:8000/users/${e.target.aluno2.value}/`, {
      method: "PUT",
      body: form
    })
    if (response.ok) {
      window.location.reload()
    }
  }

  const handleUpdateUser3Group = async (e) => {
    e.preventDefault();
    const form = new FormData()
    form.append("id_grupo", id_grupo)
    form.append("nome", users?.find(user => user.id == e.target.aluno3.value).nome)
    form.append("email", users?.find(user => user.id == e.target.aluno3.value).email)
    form.append("registro", users?.find(user => user.id == e.target.aluno3.value).registro)
    const response = fetch(`http://localhost:8000/users/${e.target.aluno3.value}/`, {
      method: "PUT",
      body: form
    })
    if (response.ok) {
      window.location.reload()
    }
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
                    <Button
                      color="info"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
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
                      <Input
                        type="select"
                        name="prof"
                        id="prof"
                        disabled={!isEditing}
                        defaultValue={group?.id_professor}
                      >
                        {handleProfs(profs)}
                      </Input>
                    </Col>
                  </Row>
                </Typography>
          <br />
            <Typography gutterBottom variant="h8" component="div">
              <Row>
              <Col md="4">
              <Label for="user_1">Primeiro membro</Label>
                  <Input
                    type="select"
                    defaultValue={users?.id}
                    disabled
                    name="aluno"
                  >
                    <option value={user?.id}>{user?.nome}</option>
                  </Input>
                  </Col>
                <Col md="4">
                <Label for="user_2">Segundo membro</Label>
                <Input
                    type="select"
                    defaultValue={users?.id}
                    disabled={!isEditing}
                    name="aluno2"
                  >
                    <option value=""></option>
                    {handleUsers(users)}
                  </Input>
                  </Col>
                  <Col md="4">
                  <Label for="user_3">Terceiro membro</Label>
                  <Input
                    type="select"
                    defaultValue={users?.id}
                    disabled={!isEditing}
                    name="aluno3"
                  >
                    <option value=""></option>
                    {handleUsers(users)}
                  </Input>
                  </Col>
              </Row>
            </Typography>
        </CardContent>
        </Form>
      </CardActionArea>
    </Card>
    )
  }


  return (
    <>
    <Header />
    <Container fluid style={{paddingTop: 25}}>
        <Row>
          {groupBox(group)}
        </Row>
    </Container>
    </>
  );
};

export default Group;
