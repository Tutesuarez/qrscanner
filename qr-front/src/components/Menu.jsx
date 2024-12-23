import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Menu.css';

const Menu = ({ setActivePage }) => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#">Gestión de Códigos QR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setActivePage('scanner')}>Escanear</Nav.Link>
            <Nav.Link onClick={() => setActivePage('addCode')}>Agregar Código</Nav.Link>
            <Nav.Link onClick={() => setActivePage('codeList')}>Lista de Códigos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
