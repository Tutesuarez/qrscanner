
// import React, { useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode'; // Importamos la librería para escanear QR
// import { Alert, Button } from 'react-bootstrap'; // Importamos componentes de Bootstrap

// const QRScanner = () => {
//   const [scannedCode, setScannedCode] = useState(null); // Estado para almacenar el código escaneado
//   const [matchMessage, setMatchMessage] = useState(''); // Estado para mostrar el mensaje de coincidencia

//   // Función que se ejecuta al presionar el botón de escanear
//   const handleScan = () => {
//     // Inicializamos el escáner QR con la configuración (fps y tamaño de la caja de escaneo)
//     const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

//     // Renderizamos el escáner
//     scanner.render(
//       (decodedText) => {
//         // Cuando escaneamos el código, lo almacenamos en el estado
//         setScannedCode(decodedText);

//         // Hacemos una solicitud POST al backend para verificar si el código está almacenado
//         fetch('http://localhost:3000/api/qr/check-code', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ code: decodedText }), // Enviamos el código escaneado
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.match) {
//               setMatchMessage('¡El código coincide con uno almacenado!'); // Mensaje de éxito
//             } else {
//               setMatchMessage('No se encontró coincidencia.'); // Mensaje de error
//             }
//           })
//           .catch((err) => {
//             console.error('Error al verificar el código:', err);
//             setMatchMessage('Error al verificar el código.'); // Manejo de error si no se puede conectar con el backend
//           });

//         scanner.clear(); // Detenemos el escáner después de un escaneo
//       },
//       (error) => {
//         console.error('Error escaneando código:', error); // Error al escanear
//       }
//     );
//   };

//   return (
//     <div className="text-center">
//       <h2>Escanear Código QR</h2>
//       <div id="reader" style={{ width: '300px', margin: 'auto' }}></div>
//       <Button onClick={handleScan} variant="primary" className="mt-3">
//         Iniciar Escaneo
//       </Button>
//       {scannedCode && <p>Código Escaneado: {scannedCode}</p>}
//       {matchMessage && (
//         <Alert variant={matchMessage.includes('coincide') ? 'success' : 'danger'}>
//           {matchMessage}
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default QRScanner;

import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

const QRScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [matchMessage, setMatchMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [scannerActive, setScannerActive] = useState(false);
  let scannerInstance = null; // Referencia al escáner para detenerlo si es necesario

  const startScanner = () => {
    if (!scannerActive) {
      scannerInstance = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false // Modo sin consola
      );

      scannerInstance.render(
        (decodedText) => {
          setScannedCode(decodedText);

          // Consultar al backend para verificar si hay match
          fetch(`http://localhost:3000/api/qr/check-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: decodedText }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.match) {
                setMatchMessage('¡Código encontrado en la base de datos!');
                setAlertVariant('success');

                // Detener el escáner
                if (scannerInstance) {
                  scannerInstance.clear();
                  setScannerActive(false);
                }
              } else {
                setMatchMessage('Código no encontrado en la base de datos.');
                setAlertVariant('danger');
              }
            })
            .catch((err) => {
              console.error('Error al verificar el código:', err);
              setMatchMessage('Error al verificar el código.');
              setAlertVariant('warning');
            });
        },
        (error) => {
          console.error('Error escaneando código:', error);
        }
      );

      setScannerActive(true);
    }
  };

  const stopScanner = () => {
    if (scannerInstance) {
      scannerInstance.clear();
      setScannerActive(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center">Escanear Código QR</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          {matchMessage && (
            <Alert variant={alertVariant} onClose={() => setMatchMessage('')} dismissible>
              {matchMessage}
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col className="text-center">
          <Button variant="primary" onClick={startScanner} disabled={scannerActive}>
            {scannerActive ? 'Escáner Activo' : 'Iniciar Escáner'}
          </Button>
          {' '}
          <Button variant="danger" onClick={stopScanner} disabled={!scannerActive}>
            Detener Escáner
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6} id="reader" style={{ width: '100%' }}></Col>
      </Row>
      {scannedCode && (
        <Row className="mt-3">
          <Col>
            <p className="text-center">
              <strong>Código Escaneado:</strong> {scannedCode}
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default QRScanner;

