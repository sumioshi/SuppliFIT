import React from 'react';
import { Row, Col, Pagination, Alert, Spinner } from 'react-bootstrap';
import { Supplement } from '../../services/supplementsService';
import SupplementCard from './SupplementCard';

interface SupplementListProps {
  supplements: Supplement[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

const SupplementList: React.FC<SupplementListProps> = ({
  supplements,
  loading,
  error,
  totalCount,
  currentPage,
  pageSize = 12,
  onPageChange
}) => {
  // Calcular número total de páginas
  const totalPages = Math.ceil(totalCount / pageSize);
  
  // Renderizar paginação
  const renderPagination = () => {
    const items = [];
    const maxPageItems = 5;
    
    // Página anterior
    items.push(
      <Pagination.Prev 
        key="prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || loading}
      />
    );
    
    // Determinar intervalo de páginas a exibir
    let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
    const endPage = Math.min(totalPages, startPage + maxPageItems - 1);
    
    if (endPage - startPage + 1 < maxPageItems) {
      startPage = Math.max(1, endPage - maxPageItems + 1);
    }
    
    // Adicionar primeira página e ellipsis se necessário
    if (startPage > 1) {
      items.push(
        <Pagination.Item 
          key={1} 
          onClick={() => onPageChange(1)}
          active={currentPage === 1}
          disabled={loading}
        >
          1
        </Pagination.Item>
      );
      
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-start" disabled={loading} />);
      }
    }
    
    // Páginas numeradas
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
          disabled={loading}
        >
          {page}
        </Pagination.Item>
      );
    }
    
    // Adicionar última página e ellipsis se necessário
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-end" disabled={loading} />);
      }
      
      items.push(
        <Pagination.Item 
          key={totalPages} 
          onClick={() => onPageChange(totalPages)}
          active={currentPage === totalPages}
          disabled={loading}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    
    // Próxima página
    items.push(
      <Pagination.Next 
        key="next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || loading}
      />
    );
    
    return <Pagination>{items}</Pagination>;
  };
  
  return (
    <div>
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p className="mt-2">Carregando suplementos...</p>
        </div>
      )}
      
      {error && !loading && (
        <Alert variant="danger">
          Erro ao carregar suplementos: {error}
        </Alert>
      )}
      
      {!loading && !error && supplements.length === 0 && (
        <Alert variant="info">
          Nenhum suplemento encontrado com os filtros selecionados.
        </Alert>
      )}
      
      {!loading && !error && supplements.length > 0 && (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-4">
            {supplements.map(supplement => (
              <Col key={supplement.id}>
                <SupplementCard supplement={supplement} />
              </Col>
            ))}
          </Row>
          
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="text-muted mb-0">
              Mostrando {supplements.length} de {totalCount} suplementos
            </p>
            
            {totalPages > 1 && (
              <div className="d-flex justify-content-center">
                {renderPagination()}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SupplementList;