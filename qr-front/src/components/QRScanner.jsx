// export default QRScanner;

import React, { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import './QRScanner.css';

const QRScanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [matchMessage, setMatchMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isScanning, setIsScanning] = useState(false); // Para gestionar el estado del escáner
  const [scanner, setScanner] = useState(null); // Guardar la instancia del escáner

  // Iniciar el escáner
  const startScanner = () => {
    const newScanner = new Html5Qrcode("reader");
    setScanner(newScanner);

    newScanner.start(
      { facingMode: "environment" }, // Cámara trasera
      {
        fps: 10, // Frames por segundo
        qrbox: 250, // Tamaño del área de escaneo
      },
      (decodedText) => {
        setScannedCode(decodedText);

        // Consultar al backend para verificar si hay un match
        fetch(`https://qrscanner-back.onrender.com/api/qr/check-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: decodedText }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.match) {
              setMatchMessage('¡Código encontrado en la base de datos!');
              setAlertVariant('success');
              // Detener el escáner cuando se encuentra un código compatible
              newScanner.stop();
              setIsScanning(false); // Cambiar el estado a "no activo"
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
    setIsScanning(true); // Establecer el estado a "activo"
  };

  // Detener el escáner
  const stopScanner = () => {
    if (scanner) {
      scanner.stop(); // Detener el escáner
      setIsScanning(false); // Cambiar el estado de escaneo a "no activo"
      setMatchMessage('Escaneo detenido.');
      setAlertVariant('info');
    }
  };

  // Reiniciar el escáner después de encontrar un código
  const restartScanner = () => {
    setScannedCode(null); // Limpiar el código escaneado
    setMatchMessage(''); // Limpiar el mensaje de alerta
    setIsScanning(false); // Detener el estado de escaneo
    startScanner(); // Iniciar el escáner nuevamente
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center">Escanear bolsa</h2>
        </Col>
      </Row>

      {/* Mostrar mensajes de alerta */}
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          {matchMessage && (
            <Alert variant={alertVariant} onClose={() => setMatchMessage('')} dismissible>
              {matchMessage}
            </Alert>
          )}
        </Col>
      </Row>

      {/* Botones para iniciar, detener y reiniciar el escáner */}
      <Row className="justify-content-center mt-3">
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="me-2" // Espacio entre botones
            variant="primary"
            onClick={startScanner}
            disabled={isScanning}
          >
            {isScanning ? 'Escáner Activo' : 'Iniciar Escáner'}
          </Button>

          <Button
            className="me-2" // Espacio entre botones
            variant="danger"
            onClick={stopScanner}
            disabled={!isScanning}
          >
            Detener
          </Button>

          {scannedCode && (
            <Button
              variant="secondary"
              onClick={restartScanner}
            >
              Reiniciar
            </Button>
          )}
        </Col>
      </Row>

      {/* Área para mostrar la cámara */}
      <Row className="justify-content-center mt-3">
        <Col md={6} id="reader" style={{ width: '100%' }}></Col>
      </Row>

      {/* Mostrar el código escaneado */}
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

