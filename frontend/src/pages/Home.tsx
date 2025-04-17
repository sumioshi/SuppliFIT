import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Bem-vindo ao SuppliFit</h1>
          <p className="text-center lead">
            Sua plataforma de assinatura de suplementos fitness.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Planos de Assinatura</Card.Title>
              <Card.Text>
                Escolha o plano perfeito para seus objetivos fitness.
              </Card.Text>
              <Button variant="primary" href="/subscription/plans">
                Ver Planos
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Suplementos Premium</Card.Title>
              <Card.Text>
                Produtos de alta qualidade selecionados por especialistas.
              </Card.Text>
              <Button variant="primary" href="/products">
                Catálogo
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Parceiros</Card.Title>
              <Card.Text>
                Encontre lojas parceiras próximas a você.
              </Card.Text>
      
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 