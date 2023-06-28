import { useState, useEffect } from "react";
import {Container, Col, Row} from "reactstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Header from "components/Headers/Header";
import { Link } from "react-router-dom";

const Solicitations = () => {

  const [user, setUser] = useState(null)
  const [solicitations, setSolicitations] = useState(null)

  const id = localStorage.getItem("id");

  useEffect(() => {
    handleGetUser()
    handleGetSolicitations()
  }, [])

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  const handleGetSolicitations = async () => {
    const response = await fetch(`http://localhost:8000/groups/?aprovado=True&professor=${id}`)
    const solicitations = await response.json()

    setSolicitations(solicitations)
  }

  const createSolicitationCard = (groups) => {
    return !groups ? null : groups.map((prop) => {
      return (
        <Link to={`/admin/group/${prop.id}`}>
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

  const createCards = (solicitations) => {
    const teste = solicitations.length == 0
    if (teste) {
      return (
          <Card sx={{ maxWidth: 290, minWidth: 290, minHeight: 255}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image= "data:image/jpeg;base64,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"
                alt="..."
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Não existem grupos em orientação
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Não existem solicitações abertas!
                Os alunos estão te dando uma folga!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      )} else {
        return createSolicitationCard(solicitations)
      }
  }
  return (
    <>
    <Header />
    <Container fluid style={{paddingTop: 25}}>
        <Row style={{gap: 25}}>
        { solicitations != null && createCards(solicitations)}
        </Row>
    </Container>
    </>
  );
};

export default Solicitations;
