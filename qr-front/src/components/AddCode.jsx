// export default AddCode;
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';




const AddCode = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setMessage('El campo de código no puede estar vacío.');
      setAlertVariant('danger');
      return;
    }

    axios.post('https://qrscanner-back.onrender.com/api/qr/add-code', { code })
      .then(() => {
        setMessage('Código agregado exitosamente.');
        setAlertVariant('success');
        setCode(''); // Limpiar el campo después de enviar
      })
      .catch((error) => {
        console.error('Error al agregar el código:', error);
        setMessage('Hubo un error al agregar el código. Inténtalo nuevamente.');
        setAlertVariant('danger');
      });
  };

  return (
    <Container className="mt-lg-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Agregar Bolsa</h2>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {message && (
            <Alert variant={alertVariant} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="codeInput">
              <Form.Label>Código QR</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el código QR de la bolsa"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Agregar Código
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCode;
