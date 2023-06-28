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
const Group = () => {

  useEffect(() => {
    handleGetUser()
    handleGetProfs()
    handleGetUsers()
  }, [])

  const navigate = useNavigate()

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

  const handleGetProfs = async () => {
    const response = await fetch(`http://localhost:8000/profs/`)
    const profs = await response.json()
    setProfs(profs)
  }

  const handleGetUsers = async () => {
    const response = await fetch(`http://localhost:8000/alunos/`)
    const users = await response.json()
    setUsers(users)
  }

  const handleUpdateUserGroup = async (id_grupo) => {
    console.log(id_grupo)
    const form = new FormData()
    form.append("nome", user?.nome)
    form.append("email", user?.email)
    form.append("registro", user?.registro)
    form.append("id_grupo", id_grupo)
    const response = await fetch(`http://localhost:8000/users/${user?.id}/`, {
      method: "PUT",
      body: form
    })
    if (response.ok) {
      navigate(`/admin/group/${id_grupo}`)
    }
  }

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const form = new FormData()
    form.append("nome", e.target.nome.value);
    form.append("descricao", e.target.descricao.value);
    form.append("img_group", e.target.img.files[0] ? e.target.img.files[0] : "")
    form.append("id_professor", e.target.prof.value);
    const response = await fetch(`http://localhost:8000/groups/`, {
      method: "POST",
      body: form
    })
    const result = await response.json()
    if (response.ok) {
      const group_id = result?.id
      handleUpdateUserGroup(group_id)
    }
  }

  const handleProfs = (profs) => {
    return !profs ? null : profs.map((prop) => {
      return (
        <option value={prop.id}>{prop.nome}</option>
      )
    })
  }

  const groupBox = () => {
    return ( 
      <>
      <h1>Bem vindo ao painel de criação de grupo {user?.nome}</h1>
      <Card sx={{ maxWidth: 1575, minWidth: 1575, minHeight: 800}}>
        <CardActionArea>
        <CardMedia
            component="img"
            height="420"
            image="https://blog.unifacig.edu.br/wp-content/uploads/2016/11/5-dicas-para-se-dar-bem-nos-trabalhos-em-grupo-da-faculdade.jpeg"
            alt="..."
          />  
          <Form onSubmit={handleCreateGroup}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Row>
                  <Col md="10">
                    <Label for="nome">Nome do grupo</Label>
                    <Input 
                      type="text"
                      name="nome"
                      id="nome"
                      style={{border: "none", fontSize: 40, fontWeight: "bold"}}
                    />
                  </Col>
                  <Col md="2" style={{marginTop: 55}}>
                    <Button
                      color="danger"
                      href={`/admin/groups`}
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="success"
                      type="submit"
                    >
                      Salvar
                    </Button>
                    
                  </Col>
                </Row>            
              </Typography>
                <Row>
                  <Col md="12">
                    <Typography variant="body2" color="text.secondary" component="div">
                      <Label for="descricao">Descrição</Label>
                      <Input 
                        style={{border: "none", fontSize: 20, fontWeight: "bold"}}
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
                      />
                    </Col>
                    <Col md="6">
                    <Label for="prof">Professor orientador</Label>
                      <Input
                        type="select"
                        name="prof"
                        id="prof"
                      >
                        {handleProfs(profs)}
                      </Input>
                    </Col>
                  </Row>
                </Typography>
        </CardContent>
        </Form>
      </CardActionArea>
    </Card>
    </>
    )
  }


  return (
    <>
    <Header />
    <Container fluid style={{paddingTop: 25}}>
        <Row>
          {groupBox()}
        </Row>
    </Container>
    </>
  );
};

export default Group;
