import api from './api';

export interface Supplement {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  available: boolean;
  image: string | null;
  category: number;
  category_name: string;
  type: string;
  serving_size: string;
  ingredients: string;
  benefits: string;
  usage_instructions: string;
  created_at: string;
  updated_at: string;
}

export interface SupplementCategory {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface SupplementsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Supplement[];
}

export interface SupplementCategoriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SupplementCategory[];
}

export interface SupplementFilters {
  category?: number;
  type?: string;
  brand?: string;
  available?: boolean;
  search?: string;
}

// Serviço para lidar com APIs de suplementos
const supplementsService = {
  // Buscar todos os suplementos com filtros opcionais
  getSupplements: async (filters?: SupplementFilters): Promise<SupplementsResponse> => {
    const response = await api.get<SupplementsResponse>('/api/v1/supplements/supplements/', { params: filters });
    return response.data;
  },
  
  // Buscar um suplemento específico
  getSupplement: async (id: number): Promise<Supplement> => {
    const response = await api.get<Supplement>(`/api/v1/supplements/supplements/${id}/`);
    return response.data;
  },
  
  // Buscar todas as categorias de suplementos
  getCategories: async (): Promise<SupplementCategoriesResponse> => {
    const response = await api.get<SupplementCategoriesResponse>('/api/v1/supplements/categories/');
    return response.data;
  },
  
  // Buscar uma categoria específica
  getCategory: async (id: number): Promise<SupplementCategory> => {
    const response = await api.get<SupplementCategory>(`/api/v1/supplements/categories/${id}/`);
    return response.data;
  }
};

export default supplementsService;