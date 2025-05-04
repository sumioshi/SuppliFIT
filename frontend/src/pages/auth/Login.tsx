import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { RootState } from '../../store';
import { useAppDispatch } from '../../app/hooks';

// Hook customizado simples
const useLocalDispatch = () => useAppDispatch();

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useLocalDispatch();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Usando o dispatch como uma função normal
    dispatch(login({ email, password }) as any);
  };

  return (
    <>
      <h3 className="mb-4">Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading} className="w-100">
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </Form>
      <div className="mt-3 text-center">
        <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
      </div>
    </>
  );
};

export default Login; 