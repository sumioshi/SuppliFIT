import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { SupplementCategory, SupplementFilters } from '../../services/supplementsService';

interface SupplementFiltersProps {
  categories: SupplementCategory[];
  onFilterChange: (filters: SupplementFilters) => void;
}

const SupplementFilterForm: React.FC<SupplementFiltersProps> = ({ 
  categories, 
  onFilterChange 
}) => {
  const [filters, setFilters] = useState<SupplementFilters>({
    category: undefined,
    type: undefined,
    brand: '',
    available: true,
    search: ''
  });
  
  // Aplicar filtros quando mudar
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  // Manipular mudanças nos filtros
  const handleFilterChange = (name: keyof SupplementFilters, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Redefinir todos os filtros
  const handleReset = () => {
    setFilters({
      category: undefined,
      type: undefined,
      brand: '',
      available: true,
      search: ''
    });
  };
  
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Filtros</h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={6} lg={3}>
              <Form.Group className="mb-3">
                <Form.Label>Pesquisar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome ou palavra-chave"
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value ? Number(e.target.value) : undefined)}
                >
                  <option value="">Todas as categorias</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Select
                  value={filters.type || ''}
                  onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
                >
                  <option value="">Todos os tipos</option>
                  <option value="protein">Proteína</option>
                  <option value="pre_workout">Pré-treino</option>
                  <option value="bcaa">BCAA</option>
                  <option value="creatine">Creatina</option>
                  <option value="vitamins">Vitaminas</option>
                  <option value="other">Outros</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group className="mb-3">
                <Form.Label>Disponibilidade</Form.Label>
                <Form.Check
                  type="switch"
                  id="available-switch"
                  label="Mostrar apenas disponíveis"
                  checked={!!filters.available}
                  onChange={(e) => handleFilterChange('available', e.target.checked)}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <div className="d-flex justify-content-end">
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={handleReset}
              className="me-2"
            >
              Limpar filtros
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SupplementFilterForm;