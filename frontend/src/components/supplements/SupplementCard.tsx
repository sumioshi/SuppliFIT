import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Supplement } from '../../services/supplementsService';

interface SupplementCardProps {
  supplement: Supplement;
}

const SupplementCard: React.FC<SupplementCardProps> = ({ supplement }) => {
  // Função para formatar preço
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Função para exibir badge de tipo
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

  return (
    <Card className="h-100 shadow-sm">
      <div className="text-center p-3">
        {supplement.image ? (
          <Card.Img 
            variant="top" 
            src={supplement.image} 
            alt={supplement.name}
            style={{ height: '200px', objectFit: 'contain' }} 
          />
        ) : (
          <div 
            className="bg-light d-flex justify-content-center align-items-center"
            style={{ height: '200px' }}
          >
            <span className="text-muted">Sem imagem</span>
          </div>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <div className="d-flex mb-2">
          {renderTypeBadge(supplement.type)}
          {!supplement.available && (
            <Badge bg="danger">Indisponível</Badge>
          )}
        </div>
        
        <Card.Title>{supplement.name}</Card.Title>
        
        <Card.Subtitle className="mb-2 text-muted">
          {supplement.brand}
        </Card.Subtitle>
        
        <Card.Text className="small text-truncate mb-2">
          {supplement.description}
        </Card.Text>
        
        <Card.Text className="mb-2">
          <small className="text-muted">
            Categoria: {supplement.category_name}
          </small>
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0 text-primary fw-bold">
              {formatPrice(supplement.price)}
            </span>
            
            <Link to={`/supplements/${supplement.id}`}>
              <Button variant="outline-primary" size="sm">
                Ver detalhes
              </Button>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SupplementCard;