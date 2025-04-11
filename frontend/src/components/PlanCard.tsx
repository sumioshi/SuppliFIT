import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface PlanCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

interface CardProps {
  isPopular?: boolean;
}

const Card = styled(motion.div)<CardProps>`
  background: ${(props: CardProps) => props.isPopular 
    ? 'linear-gradient(145deg, #2a2a2a, #1a1a1a)' 
    : 'linear-gradient(145deg, #1a1a1a, #0a0a0a)'};
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid ${(props: CardProps) => props.isPopular ? '#4a90e2' : '#333'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const PopularBadge = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: -2rem;
  background: #4a90e2;
  color: white;
  padding: 0.5rem 2rem;
  transform: rotate(45deg);
  font-size: 0.8rem;
  font-weight: bold;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Price = styled.div`
  color: #4a90e2;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled(motion.li)`
  color: #ccc;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "✓";
    color: #4a90e2;
  }
`;

const SelectButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background: linear-gradient(90deg, #4a90e2, #357abd);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #357abd, #4a90e2);
  }
`;

const PlanCard: React.FC<PlanCardProps> = ({ title, price, features, isPopular, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      isPopular={isPopular}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isPopular && (
        <PopularBadge
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Mais Popular
        </PopularBadge>
      )}
      
      <Title>{title}</Title>
      <Price>{price}</Price>
      
      <FeatureList>
        {features.map((feature, index) => (
          <Feature
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {feature}
          </Feature>
        ))}
      </FeatureList>

      <SelectButton
        onClick={onSelect}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Selecionar Plano
      </SelectButton>
    </Card>
  );
};

export default PlanCard; 