// import React, { useState } from 'react';
// import AddCode from './components/AddCode';
// import QRScanner from './components/QRScanner';
// import CodeList from './components/CodeList';
// import './App.css';

// const App = () => {
//   const [codes, setCodes] = useState([]);

//   const updateCodes = (newCodes) => {
//     setCodes(newCodes);
//   };

//   const handleScanSuccess = async (decodedText) => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/qr/check-code', {
//         code: decodedText,
//       });
//       if (response.data.match) {
//         alert('¡Código encontrado en la base de datos!');
//       } else {
//         alert('El código no está en la base de datos.');
//       }
//     } catch (error) {
//       console.error('Error al verificar el código:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Gestor de Códigos QR</h1>
//       <AddCode updateCodes={updateCodes} />
//       <QRScanner onScanSuccess={handleScanSuccess} />
//       <CodeList codes={codes} updateCodes={updateCodes} />
//     </div>
//   );
// };


// ////// estructura que funcionba 
// // export default App;
// import React, { useState } from 'react';
// import Menu from './components/Menu';
// import QRScanner from './components/QRScanner';
// import CodeList from './components/CodeList';
// import AddCode from './components/AddCode';
// import { Button, Container, Row, Col, Alert } from "react-bootstrap";

// const App = () => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case 'scan':
//         return <QRScanner />;
//       case 'list':
//         return <CodeList />;
//       case 'add':
//         return <AddCode />;
//       default:
//         return <p>Selecciona una opción del menú.</p>;
//     }
//   };

//   return (
//     // <div className="app-container">
//     //   <h1>Gestión de Códigos QR</h1>
//     //   <Menu onSelectOption={setSelectedOption} />
//     //   <div style={{ marginTop: '20px' }}>
//     //     {renderComponent()}
//     //   </div>
//     // </div>
//     <Container>
//     <Row className="justify-content-center mt-5">
//       <Col md={4}>
//         <h2 className="text-center">Menú</h2>
//         <Button
//           variant="primary"
//           className="w-100 mb-2"
//           onClick={() => setShowScanner(!showScanner)}
//         >
//           {showScanner ? "Cerrar Escáner" : "Escanear Código"}
//         </Button>
//         <Button
//           variant="secondary"
//           className="w-100 mb-2"
//           onClick={() => setShowCodes(!showCodes)}
//         >
//           {showCodes ? "Cerrar Lista de Códigos" : "Ver Códigos Guardados"}
//         </Button>
//         <Button
//           variant="success"
//           className="w-100"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Cerrar Formulario" : "Ingresar Nuevo Código"}
//         </Button>
//       </Col>
//     </Row>

//     {/* Mostrar Escáner de Código QR */}
//     {showScanner && <CodeScanner />}

//     {/* Mostrar Lista de Códigos */}
//     {showCodes && <CodeList />}

//     {/* Mostrar Formulario de Ingreso de Código */}
//     {showForm && <CodeForm />}
//   </Container>
// );
// }
// export default App;

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

      <Container className="mt-5">
        {/* Condicional para mostrar la vista según la opción seleccionada */}
        {activePage === 'scanner' && <QRScanner />}
        {activePage === 'addCode' && <AddCode />}
        {activePage === 'codeList' && <CodeList />}
      </Container>
    </div>
  );
};

export default App;
