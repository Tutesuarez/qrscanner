import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Button, ListGroup, Container, Row, Col, Spinner } from 'react-bootstrap';


const CodeList = () => {
  const [codes, setCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://qrscanner-back.onrender.com/api/qr/get-codes')
      .then(response => {
        console.log('Datos obtenidos:', response.data); // Verifica los datos
        if (response.data && response.data.success) {
          setCodes(response.data.data); // Actualiza el estado con la propiedad 'data'
        } else {
          console.error('Error: Respuesta inesperada de la API');
        }
      })
      .catch(error => {
        console.error('Error al obtener los códigos:', error);
      })
  .finally(() => {
    setIsLoading(false); // Desactivar spinner
  });
  }, []);

  const handleDeleteCode = (id) => {
    axios.delete(`https://qrscanner-back.onrender.com/api/qr/${id}`)
      .then(() => {
        setCodes(codes.filter(code => code._id !== id));
        alert('Código eliminado.');
      })
      .catch(error => {
        console.error('Error al eliminar el código:', error);
        alert('Hubo un error al eliminar el código.');
      });
  };

  const handleDeleteAllCodes = () => {
    axios.delete('https://qrscanner-back.onrender.com/api/qr')
      .then(() => {
        setCodes([]);
        alert('Todos los códigos fueron eliminados.');
      })
      .catch(error => {
        console.error('Error al eliminar todos los códigos:', error);
        alert('Hubo un error al eliminar los códigos.');
      });
  };

  return (
    <Container className="mt-lg-5">
    <Row className="mb-4">
      <Col>
        <h2 className="text-center">Lista de Bolsas</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        {isLoading ? (
            // Spinner mientras se cargan los datos
            <div className="text-center">
              <Spinner animation="border" role="status" variant="succes">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <p>Cargando datos...</p>
            </div>
          ) : codes.length === 0 ? (
            <p className="text-center text-muted">No hay códigos almacenados.</p>
          ) : (
          <ListGroup>
            {codes.map((code, index) => (
              <ListGroup.Item key={code._id} className={`d-flex justify-content-between align-items-center ${
                    index % 2 === 0 ? 'bg-light' : 'bg-white'
                  }`}>
                <span className="fw-bold">{code.code}</span>
                <Button variant="danger" size="sm" onClick={() => handleDeleteCode(code._id)}>
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
    <Row className="mt-3">
      <Col className="text-center">
        <Button variant="danger" onClick={handleDeleteAllCodes} className="px-4">
          Eliminar Todos
        </Button>
      </Col>
    </Row>
  </Container>
  );
};

export default CodeList;


