import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "../../styles/dashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import {
  MdBusinessCenter,
  MdFreeCancellation,
  MdDashboard,
} from "react-icons/md";
import { AiFillSchedule, AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { BsScissors } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import PainelBarbearia from "../../components/PainelBarbearia";
import { Card } from "react-bootstrap";
import HeaderBarbearia from "../../components/HeaderBarbearia";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode"

const CortesEstilos = () => {

  const [data, setData] = useState([]);
  const token = Cookies.get('token')
  const decodedToken = jwt_decode(token)
  // console.log(decodedToken)
  const id = decodedToken.id
  const apiUrl = "http://localhost:8001"


  useEffect(() => {
    async function fetchData() {
        try {
          const res = await axios.get(`${apiUrl}/painel-barbearia/${id}`, {
            withCredentials: true
          })
           const data = {
              cortesestilos: res.data.cortesestilos
           }
           setData(data)
           console.log(data)
        } catch(error){
          console.error('Erro ao buscar dados da API:', error)
        }
    }
    fetchData()
  }, [])


  return (
    <>
      <HeaderBarbearia />
      <Container className="default-margin">
        <Row className="justify-content-center shadow rounded bg-white">
          <Col
            md={3}
            className="bg-light col-auto d-flex flex-column p-5 rounded bg-white"
          >
            <PainelBarbearia />
          </Col>

          <Col md={9} className="border p-5 rounded bg-light">
            <div className="d-flex">
              <BsScissors className="fs-2 text-secondary" />
              <h3 className="fw-bold text-secondary ms-3 mb-5">
                Cortes e Estilos
              </h3>
            </div>
            <Link to="./adicionar-corteestilo">
              <Button variant="primary px-4 py-2 agendar shadow rounded-pill mt-3 ">
              <HiOutlinePlusSm />
                Adicionar
              </Button>
            </Link>
            <ListGroup horizontal variant="flush" className="mt-3 d-flex">
              <Container>
                <Row>
                  {data && data.cortesestilos && data.cortesestilos.length === 0 ? (
                    <h5 className="text-muted mt-4">Não há nenhum corte ou estilo registrado.</h5>
                  ) : (
                    <Card
                    style={{ width: "18rem" }}
                    className="border-0 shadow m-1 p-3"
                  >
                    <Card.Body>
                      <h5 className="fw-bold fs-6 text-uppercase">
                        Corte degradê
                      </h5>
                      <h5 className="text-success fs-6">R$30,00</h5>
                      <p className="">Tempo estimado: 30 minutos</p>
                      <Button className="bg-danger px-4 py-2 btnRed shadow rounded-pill w-100 mt-3 mb-1">
                        <MdFreeCancellation />
                        Remover
                      </Button>
                      <Link to="./editar-corteestilo">
                      <Button className="bg-dark px-4 py-2  btnDark shadow rounded-pill w-100">
                        <AiOutlineEdit />
                        Alterar
                      </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                  )}
                  

                  

                  
                </Row>
              </Container>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CortesEstilos;
