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
          <Col
            md={3}
            className="rounded bg-light col-auto d-flex flex-column p-5 bg-white"
          >
            <PainelBarbearia />
          </Col>
          <Col md={9} className="rounded p-5 bg-light border">
            <Container>
              <Row>
                <Link
                  to="../painel-barbearia/cortes-estilos"
                  id="linkBack"
                  className="me-5 py-1 fw-bold text-dark mb-5"
                >
                  <MdOutlineArrowBackIos
                    style={{ fontSize: 15 }}
                    className="me-2"
                  />
                  Voltar para cortes e estilos
                </Link>
                <Col md={6}>
                  <div class="form-floating mb-4">
                    <input
                      id="corte"
                      type="text"
                      placeholder="12345teste"
                      className="form-control shadow"
                      required
                      autoComplete="senha"
                    />
                    <label for="floatingInput" className="text-secondary">
                      <BsScissors className="fs-3 me-2" />
                      Ex. Corte degradê
                    </label>
                  </div>
                </Col>
                <Col md={3}>
                  <div class="form-floating mb-4">
                    <input
                      id="corte"
                      type="text"
                      placeholder="12345teste"
                      className="form-control shadow"
                      required
                      autoComplete="senha"
                    />
                    <label for="floatingInput" className="text-secondary">
                      <MdAttachMoney className="fs-3 me-2" />
                      Ex. 40
                    </label>
                  </div>
                </Col>
                <Col md={6}>
                  <div class="form-floating mb-4">
                    <input
                      id="corte"
                      type="text"
                      placeholder="12345teste"
                      className="form-control shadow"
                      required
                      autoComplete="senha"
                    />
                    <label for="floatingInput" className="text-secondary">
                      <BsClock className="fs-3 me-2" />
                      Ex. 40
                    </label>
                  </div>
                </Col>
                <Col md={12}>
                  <Button variant="primary px-4 py-2 agendar shadow rounded-pill mt-3 ">
                    <HiOutlinePlusSm />
                    Adicionar
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default AdicionarCorteEstilo;
