import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Container>
      <h1 className="mb-4">Dashboard</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Perfil</Card.Title>
              <Card.Text>
                Bem-vindo, {user?.username || 'Usuário'}!
              </Card.Text>
              <Card.Link href="/profile">Editar Perfil</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Minhas Assinaturas</Card.Title>
              <Card.Text>
                Gerencie suas assinaturas ativas.
              </Card.Text>
              <Card.Link href="/subscription/my">Ver Assinaturas</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Recomendações</Card.Title>
              <Card.Text>
                Produtos recomendados baseados no seu perfil.
              </Card.Text>
              <Card.Link href="/recommendations">Ver Recomendações</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 