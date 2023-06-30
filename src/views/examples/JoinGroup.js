import { useNavigate, useParams } from "react-router-dom";
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
    handleGetProfs()
  }, [])

  const [group, setGroup] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profs, setProfs] = useState(null)
  const [user, setUser] = useState(null)

  const id = localStorage.getItem("id");

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  const navigate = useNavigate();

  const params = useParams()

  const id_grupo = params.id 

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

  const handleEntryGroup = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("nome", user?.nome);
    form.append("email", user?.email);
    form.append("registro", user?.registro);
    form.append("id_grupo", id_grupo);
    const response = await fetch(`http://localhost:8000/users/${id}/`, {
      method: "PUT",
      body: form
    })
    if (response.ok) {
      navigate(`/admin/group/${id_grupo}/timeline`)
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
          <Form onSubmit={handleEntryGroup}>
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
                      disabled
                    />
                  </Col>
                  <Col md="3" style={{marginTop: 55}}>
                    <Button
                      
                      color="info"
                      href={`/admin/groups`}
                    >
                      Voltar
                    </Button>
                    <Button
                      color="success"
                      type="submit"
                    >
                      Entrar
                    </Button>
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
                        disabled
                        name="descricao"
                      />
                    </Typography>
                  </Col>
                </Row>
              <br />
              <Typography gutterBottom variant="h8" component="div">
                  <Row>
                    <Col md="12">
                    <Label for="prof">Professor orientador</Label>
                      {handleGetGroupProf(profs)}
                    </Col>
                  </Row>
                </Typography>
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
