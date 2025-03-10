import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const SubscriptionPlans: React.FC = () => {
  // Mock de planos de assinatura
  const plans = [
    {
      id: 1,
      name: 'Plano Básico',
      price: 99.90,
      period: 'mensal',
      features: [
        'Proteína Whey (500g)',
        'Creatina (100g)',
        'Entrega Mensal',
        'Recomendações básicas'
      ]
    },
    {
      id: 2,
      name: 'Plano Premium',
      price: 179.90,
      period: 'mensal',
      features: [
        'Proteína Whey (1kg)',
        'Creatina (200g)',
        'BCAA (100g)',
        'Pré-treino (150g)',
        'Entrega Mensal',
        'Recomendações personalizadas'
      ]
    },
    {
      id: 3,
      name: 'Plano Performance',
      price: 249.90,
      period: 'mensal',
      features: [
        'Proteína Whey (1.5kg)',
        'Creatina (300g)',
        'BCAA (200g)',
        'Pré-treino (300g)',
        'Multivitamínico',
        'Entrega Mensal',
        'Consulta com nutricionista',
        'Recomendações avançadas'
      ]
    }
  ];

  return (
    <Container>
      <h1 className="text-center mb-5">Planos de Assinatura</h1>
      <Row>
        {plans.map(plan => (
          <Col key={plan.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="text-center bg-primary text-white">
                <h3>{plan.name}</h3>
                <h4>R$ {plan.price.toFixed(2)}<small>/{plan.period}</small></h4>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="primary" className="mt-auto">
                  Assinar Plano
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SubscriptionPlans; 