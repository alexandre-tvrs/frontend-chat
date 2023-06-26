
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)

  const id = localStorage.getItem("id");

  useEffect(() => {
    handleGetUser()
  }, [])

  const navigate = useNavigate();

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const form = new FormData()
    form.append("email", e.target.email.value);
    form.append("nome", e.target.nome.value);
    form.append("img_usuario", e.target.img.files[0]);
    form.append("registro", user.registro);
    const response = await fetch(`http://localhost:8000/users/${id}/`, {
      method: "PUT",
      body: form
    })
  }

  return (
    <>
      <UserHeader />
      <Form onSubmit={handleUpdateUser}>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image" >
                      <img style={{backgroundImage: `url(${user?.img_usuario})`, width:"120px", height:"120px", backgroundSize:"cover", backgroundPosition:"center", borderRadius:"50%"}} />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Link to={`../group/${user?.id_grupo}`}>
                  <Button
                    className="mr-4"
                    color="info"
                    size="sm"
                  >
                    Grupo
                  </Button>
                  </Link>
                  <Button
                    className="float-right"
                    color="default"
                    size="sm"
                  >
                    Chat
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center mt-md-5">
                  <h3>
                    {user?.nome}
                    <span className="font-weight-light">, {user?.registro}</span>
                  </h3>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Minha conta</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={() => setIsEditing(!isEditing)}
                      size="sm"
                    >
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                    {isEditing ? (
                    <Button
                      color="success"
                      type="submit"
                      size="sm"
                    >
                      Salvar
                    </Button>
                  ) : null}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                
                  <h6 className="heading-small text-muted mb-4">
                    Informações de usuário
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user?.email}
                            name = "email"
                            id="input-email"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Nome
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nome"
                            defaultValue={user?.nome}
                            name = "nome"
                            type="text"
                            disabled={!isEditing}
                          />
                          </FormGroup>
                      </Col>
                          <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-imagem"
                          >
                            Ícone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-imagem"
                            type="file"
                            disabled={!isEditing}
                            name = "img"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </Form>
    </>
  );
};

export default Profile;
