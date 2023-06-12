import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "../../styles/dashboard.css";
import { InputGroup, Form, Col, Row, Container, Navbar, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { MdBusinessCenter, MdDashboard, MdAttachMoney, MdOutlineArrowBackIos } from "react-icons/md";
import { BsScissors, BsClock } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { AiFillSchedule, AiOutlinePlus } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import HeaderClienteLogado from "../../components/HeaderClienteLogado";
import PainelBarbearia from "../../components/PainelBarbearia";
import HeaderBarbearia from "../../components/HeaderBarbearia";
import { HiOutlinePlusSm } from "react-icons/hi";

const AdicionarCorteEstilo = () => {
  return (
    <>
      <HeaderBarbearia />
      <Container className="default-margin">
        <Row className="justify-content-center shadow bg-white rounded">
          <Col md={3} className="bg-white rounded col-auto d-flex flex-column p-5">
            <PainelBarbearia />
          </Col>

          <Col md={9} className="border rounded p-5 bg-light">
          <Form>
          <Link to="../painel-barbearia/cortes-estilos" id="linkBack" className="me-5 py-1 fw-bold text-dark">
          <MdOutlineArrowBackIos style={{fontSize: 15}} className="me-2"/>
              Voltar para cortes e estilos
            </Link>
            <Row className="p-4 w-auto mt-3">
            
              <Col md={6}>
                <Form.Label>Nome do corte</Form.Label>
                <InputGroup className="mb-3 shadow rounded">
                  <InputGroup.Text id="basic-addon1"><BsScissors/></InputGroup.Text>
                  <Form.Control
                    placeholder="Ex. Corte degradê"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                </Col>

                <Col md={3}>
                <Form.Label>Valor</Form.Label>
                <InputGroup className="mb-3 shadow rounded">
                  <InputGroup.Text id="basic-addon1"><MdAttachMoney/></InputGroup.Text>
                  <Form.Control
                    placeholder="Ex. 40"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                </Col>

                <Col md={5}>
                <Form.Label>Tempo estimado</Form.Label>
                <InputGroup className="mb-3 shadow rounded">
                  <InputGroup.Text id="basic-addon1"><BsClock/></InputGroup.Text>
                  <Form.Control
                    placeholder="Ex. 40"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                </Col>

                <Col md={12}>
                <Button variant="primary px-4 py-2 agendar shadow rounded-pill mt-3 "><HiOutlinePlusSm />Adicionar</Button>
                </Col>
              
            </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default AdicionarCorteEstilo;
