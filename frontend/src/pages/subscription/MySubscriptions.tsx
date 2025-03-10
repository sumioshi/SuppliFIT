import React from 'react';
import { Container, Card, Button, Badge, Row, Col } from 'react-bootstrap';

const MySubscriptions: React.FC = () => {
  // Mock de assinaturas do usuário
  const subscriptions = [
    {
      id: 1,
      plan: 'Plano Premium',
      status: 'active',
      startDate: '2025-02-15',
      nextDelivery: '2025-03-15',
      items: [
        'Proteína Whey (1kg)',
        'Creatina (200g)',
        'BCAA (100g)',
        'Pré-treino (150g)'
      ],
      price: 179.90
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <Container>
      <h1 className="mb-4">Minhas Assinaturas</h1>
      
      {subscriptions.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h3>Você não possui assinaturas ativas</h3>
            <p className="mb-4">Escolha um dos nossos planos e comece a receber suplementos mensalmente</p>
            <Button variant="primary" href="/subscription/plans">
              Ver Planos Disponíveis
            </Button>
          </Card.Body>
        </Card>
      ) : (
        subscriptions.map(subscription => (
          <Card key={subscription.id} className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h3>{subscription.plan}</h3>
              <Badge bg={subscription.status === 'active' ? 'success' : 'warning'}>
                {subscription.status === 'active' ? 'Ativa' : 'Pendente'}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <p><strong>Data de início:</strong> {formatDate(subscription.startDate)}</p>
                  <p><strong>Próxima entrega:</strong> {formatDate(subscription.nextDelivery)}</p>
                  <h5 className="mt-3">Itens incluídos:</h5>
                  <ul>
                    {subscription.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Col>
                <Col md={4} className="text-center">
                  <div className="mb-3">
                    <h4>R$ {subscription.price.toFixed(2)}</h4>
                    <p className="text-muted">por mês</p>
                  </div>
                  <Button variant="outline-primary" className="w-100 mb-2">
                    Alterar Plano
                  </Button>
                  <Button variant="outline-danger" className="w-100">
                    Cancelar Assinatura
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MySubscriptions; 