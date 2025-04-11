import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  text: string;
}

interface NavDotProps {
  active: boolean;
}

const TestimonialsContainer = styled.div`
  margin: 4rem 0;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  color: #4a90e2;
`;

const TestimonialWrapper = styled.div`
  position: relative;
  min-height: 300px;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.5);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #4a90e2;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.h3`
  color: #fff;
  margin-bottom: 0.25rem;
  font-size: 1.2rem;
`;

const Role = styled.p`
  color: #4a90e2;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  color: #ccc;
  font-style: italic;
  line-height: 1.6;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const NavDot = styled.button<NavDotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props: NavDotProps) => props.active ? '#4a90e2' : 'rgba(255, 255, 255, 0.2)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props: NavDotProps) => props.active ? '#4a90e2' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Silva',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Assinante Premium',
    text: 'O SuppliFIT transformou completamente minha rotina fitness. A consultoria nutricional personalizada fez toda a diferença nos meus resultados!'
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'Assinante Elite',
    text: 'Depois que assinei o plano Elite, meus treinos ganharam outro nível. O suporte 24/7 é sensacional e os nutricionistas são extremamente atenciosos.'
  },
  {
    id: 3,
    name: 'Mariana Costa',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Assinante Básico',
    text: 'Mesmo no plano básico, o valor que recebo é incrível. Os suplementos são de alta qualidade e o plano de treino realmente funciona!'
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [current]);

  const handleDotClick = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <TestimonialsContainer>
      <Title>O que nossos clientes dizem</Title>
      
      <TestimonialWrapper>
        <AnimatePresence mode="wait" custom={direction}>
          <TestimonialCard
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Avatar>
              <img src={testimonials[current].avatar} alt={testimonials[current].name} />
            </Avatar>
            <Name>{testimonials[current].name}</Name>
            <Role>{testimonials[current].role}</Role>
            <Text>"{testimonials[current].text}"</Text>
          </TestimonialCard>
        </AnimatePresence>
      </TestimonialWrapper>

      <Navigation>
        {testimonials.map((_, index) => (
          <NavDot
            key={index}
            active={index === current}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Navigation>
    </TestimonialsContainer>
  );
};

export default Testimonials; 