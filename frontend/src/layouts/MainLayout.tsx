import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../store';
import { useAppDispatch } from '../app/hooks';

// Hook customizado simples
const useLocalDispatch = () => useAppDispatch();

const MainLayout: React.FC = () => {
  // Usando o dispatch tipado corretamente
  const dispatch = useLocalDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    // Usando o dispatch como uma função normal
    dispatch(logout() as any);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">SuppliFit</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {isAuthenticated ? (
                <>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/subscription/plans">Planos</Nav.Link>
                  <Nav.Link href="/subscription/my">Minhas Assinaturas</Nav.Link>
                </>
              ) : null}
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <>
                  <Nav.Link href="/profile">Meu Perfil</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Entrar</Nav.Link>
                  <Nav.Link href="/register">Cadastrar</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout; 