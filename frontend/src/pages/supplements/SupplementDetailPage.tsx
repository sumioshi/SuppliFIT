import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchSupplement, clearSupplement } from '../../features/supplements/supplementsSlice';

const SupplementDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { supplement, loading, error } = useSelector((state: RootState) => state.supplements);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchSupplement(Number(id)));
    }
    
    // Limpar o suplemento ao desmontar o componente
    return () => {
      dispatch(clearSupplement());
    };
  }, [dispatch, id]);
  
  // Função para formatar preço
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  // Função para renderizar o badge de tipo
  const renderTypeBadge = (type: string): JSX.Element => {
    let variant = 'primary';
    
    switch (type) {
      case 'protein':
        variant = 'danger';
        break;
      case 'pre_workout':
        variant = 'success';
        break;
      case 'bcaa':
        variant = 'warning';
        break;
      case 'creatine':
        variant = 'info';
        break;
      case 'vitamins':
        variant = 'secondary';
        break;
      default:
        variant = 'primary';
    }
    
    const typeLabels: Record<string, string> = {
      protein: 'Proteína',
      pre_workout: 'Pré-treino',
      bcaa: 'BCAA',
      creatine: 'Creatina',
      vitamins: 'Vitaminas',
      other: 'Outro'
    };
    
    return (
      <Badge bg={variant} className="me-2">
        {typeLabels[type] || 'Outro'}
      </Badge>
    );
  };
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p className="mt-3">Carregando informações do suplemento...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Erro ao carregar suplemento</Alert.Heading>
          <p>{error}</p>
          <div className="d-flex justify-content-end">
            <Button 
              variant="outline-danger"
              onClick={() => navigate('/supplements')}
            >
              Voltar para o catálogo
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }
  
  if (!supplement) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Suplemento não encontrado</Alert.Heading>
          <p>O suplemento que você está procurando não existe ou foi removido.</p>
          <div className="d-flex justify-content-end">
            <Button 
              variant="outline-warning"
              onClick={() => navigate('/supplements')}
            >
              Voltar para o catálogo
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <Link to="/supplements" className="btn btn-outline-secondary mb-4">
        &larr; Voltar para o catálogo
      </Link>
      
      <Card>
        <Card.Header>
          <div className="d-flex align-items-center">
            {renderTypeBadge(supplement.type)}
            {!supplement.available && (
              <Badge bg="danger">Indisponível</Badge>
            )}
            <span className="ms-auto text-muted">
              ID: {supplement.id}
            </span>
          </div>
        </Card.Header>
        
        <Card.Body>
          <Row>
            <Col md={4} className="text-center mb-4 mb-md-0">
              {supplement.image ? (
                <img 
                  src={supplement.image} 
                  alt={supplement.name}
                  className="img-fluid"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
              ) : (
                <div 
                  className="bg-light d-flex justify-content-center align-items-center"
                  style={{ height: '300px' }}
                >
                  <span className="text-muted">Sem imagem</span>
                </div>
              )}
              
              <div className="mt-3">
                <h3 className="text-primary">
                  {formatPrice(supplement.price)}
                </h3>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 mt-2"
                  disabled={!supplement.available}
                >
                  {supplement.available ? 'Adicionar ao Carrinho' : 'Indisponível'}
                </Button>
              </div>
            </Col>
            
            <Col md={8}>
              <h2>{supplement.name}</h2>
              <h5 className="text-muted mb-3">{supplement.brand}</h5>
              
              <Card.Text>
                {supplement.description}
              </Card.Text>
              
              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item>
                  <strong>Categoria:</strong> {supplement.category_name}
                </ListGroup.Item>
                
                {supplement.serving_size && (
                  <ListGroup.Item>
                    <strong>Tamanho da porção:</strong> {supplement.serving_size}
                  </ListGroup.Item>
                )}
              </ListGroup>
              
              {supplement.benefits && (
                <div className="mb-3">
                  <h5>Benefícios</h5>
                  <Card.Text>
                    {supplement.benefits}
                  </Card.Text>
                </div>
              )}
              
              {supplement.usage_instructions && (
                <div className="mb-3">
                  <h5>Modo de Uso</h5>
                  <Card.Text>
                    {supplement.usage_instructions}
                  </Card.Text>
                </div>
              )}
              
              {supplement.ingredients && (
                <div>
                  <h5>Ingredientes</h5>
                  <Card.Text>
                    {supplement.ingredients}
                  </Card.Text>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
        
        <Card.Footer className="text-muted">
          <small>
            Atualizado em: {new Date(supplement.updated_at).toLocaleDateString('pt-BR')}
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SupplementDetailPage;