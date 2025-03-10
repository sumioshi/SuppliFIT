import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    termsAccepted: false
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.username.trim()) {
      newErrors.push('Nome de usuário é obrigatório');
    }
    
    if (!formData.email.trim()) {
      newErrors.push('Email é obrigatório');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Email inválido');
    }
    
    if (formData.password.length < 6) {
      newErrors.push('A senha deve ter pelo menos 6 caracteres');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('As senhas não coincidem');
    }
    
    if (!formData.termsAccepted) {
      newErrors.push('Você deve aceitar os termos de uso');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Simular registro bem-sucedido
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <>
      <h3 className="mb-4">Criar Conta</h3>
      
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul className="mb-0">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Digite seu nome de usuário"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formUserType">
          <Form.Label>Tipo de Conta</Form.Label>
          <Form.Select 
            name="userType"
            value={formData.userType}
            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          >
            <option value="customer">Cliente</option>
            <option value="partner">Lojista Parceiro</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formTerms">
          <Form.Check
            type="checkbox"
            name="termsAccepted"
            label="Eu aceito os termos de uso e política de privacidade"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={loading} className="w-100">
          {loading ? 'Processando...' : 'Cadastrar'}
        </Button>
      </Form>
      
      <div className="mt-3 text-center">
        <p>Já tem uma conta? <a href="/login">Faça login</a></p>
      </div>
    </>
  );
};

export default Register; 