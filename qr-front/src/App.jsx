import React, { useState } from 'react';
import QRScanner from './components/QRScanner.jsx';
import AddCode from './components/AddCode.jsx';
import CodeList from './components/CodeList.jsx';
import Menu from './components/Menu.jsx';
import { Container } from 'react-bootstrap';

const App = () => {
  const [activePage, setActivePage] = useState('scanner'); // Mantener el estado de la página activa

  return (
    <div className="App">
      <Menu setActivePage={setActivePage} /> {/* Menu para cambiar entre vistas */}

      <Container className="mt-lg-5">
        {/* Condicional para mostrar la vista según la opción seleccionada */}
        {activePage === 'scanner' && <QRScanner />}
        {activePage === 'addCode' && <AddCode />}
        {activePage === 'codeList' && <CodeList />}
      </Container>
    </div>
  );
};

export default App;
