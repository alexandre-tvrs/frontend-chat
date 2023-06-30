import { Button, Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";

const UserHeader = () => {
  const [user, setUser] = useState(null)

  const id = localStorage.getItem("id");

  useEffect(() => {
    handleGetUser()
  }, [])

  const handleGetUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${id}/`)
    const user = await response.json()
    setUser(user)
  }
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundColor: "#000000",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Olá {user?.nome}</h1>
              <p className="text-white mt-0 mb-5">
                Este é o ambiente do usuário. Veja e edite as informações do seu perfil:
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
