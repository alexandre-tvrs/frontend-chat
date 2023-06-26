import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {

  const navigate = useNavigate();
  const validaLogin = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("email", e.target.email.value);
    form.append("senha", e.target.senha.value);
     const result = await fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      body: form,
    })
    const response = await result.json();
    if (result.status == 200){
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.id);
      navigate("/admin/index");
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Insira suas credenciais</small>
            </div>
            <Form role="form" onSubmit={validaLogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="senha"
                    placeholder="Senha"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <small>Esqueceu sua senha?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
