import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  fetchSupplements,
  fetchCategories,
  setCurrentPage
} from '../../features/supplements/supplementsSlice';
import SupplementList from '../../components/supplements/SupplementList';
import SupplementFilters from '../../components/supplements/SupplementFilters';
import { SupplementFilters as FiltersType } from '../../services/supplementsService';

const SupplementsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    supplements, 
    categories, 
    loading, 
    error, 
    totalCount, 
    currentPage 
  } = useSelector((state: RootState) => state.supplements);
  
  // Buscar categorias quando o componente montar
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  // Buscar suplementos iniciais
  useEffect(() => {
    dispatch(fetchSupplements({ available: true }));
  }, [dispatch]);
  
  // Manipulador de mudança de filtros
  const handleFilterChange = useCallback((filters: FiltersType) => {
    dispatch(fetchSupplements(filters));
    dispatch(setCurrentPage(1));
  }, [dispatch]);
  
  // Manipulador de mudança de página
  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
    // Aqui você pode implementar a paginação real com a API quando estiver pronta
    // Por enquanto, pode ser apenas uma simulação local
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);
  
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1>Catálogo de Suplementos</h1>
          <p className="lead">
            Explore nossa variedade de suplementos de alta qualidade para alcançar seus objetivos fitness.
          </p>
        </Col>
      </Row>
      
      <SupplementFilters 
        categories={categories} 
        onFilterChange={handleFilterChange} 
      />
      
      <SupplementList 
        supplements={supplements}
        loading={loading}
        error={error}
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default SupplementsPage;