import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound: React.FC = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Página não encontrada</h2>
          <p className="lead mb-4">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button variant="primary" href="/">
            Voltar para a página inicial
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound; 