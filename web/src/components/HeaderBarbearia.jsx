import "./header/header.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { TiThMenu } from "react-icons/ti";
import  { MdNotifications, } from "react-icons/md"
import logoPreta from "../assets/img/logo1.png";
import { Dropdown } from "react-bootstrap";
import Cookies from "js-cookie";
import exBarber from "../assets/img/exBarber.png";
import Logout from "./Logout";

const HeaderBarbearia = () => {

  const fazerLogout = () => {
    Cookies.remove('token')
  }

  return (
    <>
      <Navbar expand="lg" bg="light" className=" px-lg-5  navbar">
        <Container fluid className="px-md-5 py-xl-2 py-sm-3 py-3">
          <Link to="/">
            <Navbar.Brand
              className="text-white ms-xl-5 mx-xl-5 fw-bolder"
            >
              <img src={logoPreta} className="logo" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" className="navtoggle m-0">
            <TiThMenu className="text-dark thmenu" />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav style={{ maxHeight: "100px" }} navbarScroll>
              <Link to="/" id="link" className="me-5 py-1 fw-bold text-dark">
                Página Inicial
              </Link>
              <Link
                to="/barbearias"
                id="link"
                className="me-xl-5 py-1 fw-bold text-dark"
              >
                Barbearias
              </Link>
              <Link
                to="../painel-barbearia/agendas"
                id="link"
                className="me-xl-5 py-1 fw-bold text-dark"
              >
                Minhas Agendas
              </Link>
            </Nav>

            <br />
           

              
            


            <Link to="/painel-barbearia">
            <img
                src={exBarber}
                width="32"
                height="32"
                className="rounded-circle"
              />  
            </Link>
            <Logout />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderBarbearia;
