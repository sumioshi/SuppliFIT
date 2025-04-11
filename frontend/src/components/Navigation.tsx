import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(74, 144, 226, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(90deg, #4a90e2, #357abd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

interface NavLinkProps {
  active?: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: ${(props: NavLinkProps) => props.active ? '#4a90e2' : '#fff'};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props: NavLinkProps) => props.active ? '100%' : '0'};
    height: 2px;
    background: #4a90e2;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(90deg, #4a90e2, #357abd);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavContent>
        <Logo to="/">SuppliFIT</Logo>
        <NavLinks>
          <NavLink to="/" active={location.pathname === '/'}>
            Início
          </NavLink>
          <NavLink to="/plans" active={location.pathname === '/plans'}>
            Planos
          </NavLink>
          <NavLink to="/login" active={location.pathname === '/login'}>
            Login
          </NavLink>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/cadastro'}
          >
            Começar Agora
          </CTAButton>
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navigation; 