import { useState, useEffect } from "react";
import {Container, Button, Row, Form} from "reactstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Header from "components/Headers/Header";
import { Link, useNavigate } from "react-router-dom";

const Groups = () => {

  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState(null)

  const id = localStorage.getItem("id");

  useEffect(() => {
    handleGetUser()
    handleGetAvaibleGroups()
  }, [])

  const navegate = useNavigate()

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  const handleGetAvaibleGroups = async () => {
    const response = await fetch(`http://localhost:8000/groups/?aprovado=False`)
    const groups = await response.json()
    setGroups(groups)
  }

  const createGroupCard = (groups) => {
    return !groups ? null : groups.map((prop) => {
      return (
        <Link to={user?.id_grupo != null && user?.tipo_usuario == 1 ? `/admin/group/${prop.id}` : `/admin/group/${prop.id}/join`}>
            <Card sx={{ maxWidth: 290, minWidth: 290, minHeight: 255}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={prop.img_group}
                  alt="..."
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {prop?.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {prop.descricao}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
      )
    })
  }

  const createCards = (groups) => {
    const teste = groups.length == 0
    if (teste) {
      return (
        <Link to={ `../group/new` }>
          <Card sx={{ maxWidth: 290, minWidth: 290, minHeight: 255, mt: 4 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image= "https://blogs.studentlife.utoronto.ca/lifeatuoft/files/2016/11/group.jpg"
                alt="..."
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Não existem grupos abertos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Não existem grupos abertos no momento, porém você pode criar seu próprio grupo!
                Clique no card para começar seu grupo, escolher seu tema e montar sua equipe!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      )} else {
        return createGroupCard(groups)
      }
  }

  return (
    <>
    <Header />
    <Container fluid style={{paddingTop: 25}}>
      {user?.tipo_usuario != 1 ? null : (
      <Link to={ `../group/new` }>
      <Button
      color="success"
      style={{marginBottom: 25}}
      >
      Criar novo grupo
      </Button>
      </Link>
      )}
    
        <Row style={{gap: 25}}>
        { groups != null && createCards(groups)}
        </Row>
    </Container>
    </>
  );
};

export default Groups;
