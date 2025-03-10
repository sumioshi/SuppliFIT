import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [success, setSuccess] = useState(false);
  
  // Formulários com dados do usuário
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    phone: user?.profile?.phone || '',
    address: user?.profile?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulando uma atualização bem-sucedida
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Container>
      <h1 className="mb-4">Meu Perfil</h1>
      
      {success && (
        <Alert variant="success">
          Perfil atualizado com sucesso!
        </Alert>
      )}
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Informações Pessoais</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Nome de usuário</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Label>Sobrenome</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Salvar Alterações
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Alterar Senha</h4>
              <Form>
                <Form.Group className="mb-3" controlId="formCurrentPassword">
                  <Form.Label>Senha Atual</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha atual"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formNewPassword">
                  <Form.Label>Nova Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite a nova senha"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirmar Nova Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme a nova senha"
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Alterar Senha
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile; 