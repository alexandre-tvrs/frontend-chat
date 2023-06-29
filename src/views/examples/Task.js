import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Col,
  } from "reactstrap";
import React, { useState } from 'react';
import Header from "components/Headers/Header";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

  const Task = () => {
    const create = async (e) => {
        const id_grupo = localStorage.getItem("id_grupo")
        e.preventDefault();
        const form = new FormData()
        console.log('oi')
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
            window.location.reload()
          }
      }

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

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

    return (
      <>
        <Header />
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Cadastro de Tasks</small>
              </div>
              <Form role="form" onSubmit={create}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Título"
                      name="titulo"
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Descrição"
                      name="descricao"
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <DatePicker
                        placeholderText="Data da Entrega"
                        required
                        dateFormat="dd/MM/yyyy"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        className="form-control"
                        />
                        <input type="hidden" name="dataEntrega" value={formattedDate} />
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
        </Col>
      </>
    );
  };
  
  export default Task;
  