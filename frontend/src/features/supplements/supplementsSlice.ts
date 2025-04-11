import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supplementsService, { 
  Supplement, 
  SupplementCategory,
  SupplementFilters 
} from '../../services/supplementsService';

// Interface para o estado
interface SupplementsState {
  supplements: Supplement[];
  supplement: Supplement | null;
  categories: SupplementCategory[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
}

// Estado inicial
const initialState: SupplementsState = {
  supplements: [],
  supplement: null,
  categories: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1
};

// Actions assíncronas
export const fetchSupplements = createAsyncThunk(
  'supplements/fetchSupplements',
  async (filters?: SupplementFilters, { rejectWithValue }) => {
    try {
      const response = await supplementsService.getSupplements(filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Erro ao buscar suplementos');
    }
  }
);

export const fetchSupplement = createAsyncThunk(
  'supplements/fetchSupplement',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await supplementsService.getSupplement(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Erro ao buscar suplemento');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'supplements/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await supplementsService.getCategories();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Erro ao buscar categorias');
    }
  }
);

// Slice
const supplementsSlice = createSlice({
  name: 'supplements',
  initialState,
  reducers: {
    clearSupplement: (state) => {
      state.supplement = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchSupplements
      .addCase(fetchSupplements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplements.fulfilled, (state, action) => {
        state.loading = false;
        state.supplements = action.payload.results;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchSupplements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // fetchSupplement
      .addCase(fetchSupplement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplement.fulfilled, (state, action) => {
        state.loading = false;
        state.supplement = action.payload;
      })
      .addCase(fetchSupplement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.results;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearSupplement, setCurrentPage } = supplementsSlice.actions;

export default supplementsSlice.reducer;