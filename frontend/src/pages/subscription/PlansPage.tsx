import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import PlanCard from '../../components/PlanCard';
import Navigation from '../../components/Navigation';
import Testimonials from '../../components/Testimonials';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  color: white;
  padding-top: 80px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #4a90e2, #357abd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const FAQSection = styled(motion.div)`
  margin-top: 6rem;
  padding: 2rem;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 20px;
`;

const FAQTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #4a90e2;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FAQItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FAQQuestion = styled.h3`
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FAQAnswer = styled(motion.p)`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
`;

const plans = [
  {
    title: 'Básico',
    price: 'R$ 49,90',
    features: [
      'Acesso a todos os suplementos básicos',
      'Consultoria nutricional básica',
      'Plano de treino personalizado',
      'Suporte por email',
      'Acesso à comunidade'
    ],
    isPopular: false
  },
  {
    title: 'Premium',
    price: 'R$ 99,90',
    features: [
      'Tudo do plano Básico',
      'Consultoria nutricional avançada',
      'Plano de treino premium',
      'Suporte prioritário 24/7',
      'Acesso a workshops exclusivos',
      'Desconto em produtos parceiros'
    ],
    isPopular: true
  },
  {
    title: 'Elite',
    price: 'R$ 199,90',
    features: [
      'Tudo do plano Premium',
      'Consultoria personalizada 1:1',
      'Plano de treino elite',
      'Suporte VIP 24/7',
      'Acesso a todos os workshops',
      'Descontos exclusivos',
      'Mentoria individual'
    ],
    isPopular: false
  }
];

const faqs = [
  {
    question: 'Como funciona a consultoria nutricional?',
    answer: 'Nossa consultoria nutricional é personalizada e inclui análise detalhada do seu perfil, objetivos e necessidades específicas. Você receberá um plano alimentar completo e acompanhamento regular.'
  },
  {
    question: 'Posso cancelar minha assinatura?',
    answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. O acesso aos serviços continuará disponível até o final do período pago.'
  },
  {
    question: 'Como funciona o suporte?',
    answer: 'Oferecemos diferentes níveis de suporte conforme o plano escolhido. Do suporte por email no plano básico até suporte VIP 24/7 no plano elite.'
  }
];

const PlansPage: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  const handlePlanSelect = (planTitle: string) => {
    // Implementar lógica de seleção de plano
    console.log(`Plano selecionado: ${planTitle}`);
  };

  return (
    <Container>
      <Navigation />
      <Content>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Escolha seu Plano</Title>
          <Subtitle>
            Selecione o plano que melhor se adequa às suas necessidades e comece sua jornada fitness hoje mesmo!
          </Subtitle>
        </Header>

        <PlansGrid>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <PlanCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
                onSelect={() => handlePlanSelect(plan.title)}
              />
            </motion.div>
          ))}
        </PlansGrid>

        <Testimonials />

        <FAQSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FAQTitle>Perguntas Frequentes</FAQTitle>
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FAQQuestion>{faq.question}</FAQQuestion>
                <AnimatePresence>
                  {selectedFAQ === index && (
                    <FAQAnswer
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </FAQGrid>
        </FAQSection>
      </Content>
    </Container>
  );
};

export default PlansPage; 