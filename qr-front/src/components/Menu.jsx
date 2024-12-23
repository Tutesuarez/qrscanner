// import React from 'react';

// const Menu = ({ onSelectOption }) => (
//   <nav>
//     <button onClick={() => onSelectOption('scan')}>Escanear QR</button>
//     <button onClick={() => onSelectOption('list')}>Ver Lista de Códigos</button>
//     <button onClick={() => onSelectOption('add')}>Cargar Código</button>
//   </nav>
// );

// export default Menu;

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Menu = ({ setActivePage }) => {
  return (
    <Navbar bg="light" expand="lg">
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
