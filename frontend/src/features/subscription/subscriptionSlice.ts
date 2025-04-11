import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

// Interfaces
interface Plan {
  id: number;
  name: string;
  plan_type: string;
  description: string;
  price: number;
  supplements_per_month: number;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Subscription {
  id: number;
  user: number;
  plan: number;
  status: string;
  start_date: string;
  end_date: string;
  remaining_supplements: number;
  renewal_enabled: boolean;
  price_paid: number;
  created_at: string;
  updated_at: string;
  user_details?: any;
  plan_details?: Plan;
}

interface SubscriptionState {
  plans: Plan[];
  activePlans: Plan[];
  userSubscriptions: Subscription[];
  loading: boolean;
  error: string | null;
}

interface CancelResponse {
  message: string;
}

// Obter planos de assinatura
export const getSubscriptionPlans = createAsyncThunk(
  'subscription/getPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<{ results: Plan[] }>('/api/v1/subscription/plans/');
      return response.data.results;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Erro ao obter planos');
    }
  }
);

// Obter planos de assinatura ativos
export const getActivePlans = createAsyncThunk(
  'subscription/getActivePlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Plan[]>('/api/v1/subscription/plans/active/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Erro ao obter planos ativos');
    }
  }
);

// Obter assinaturas do usuário
export const getUserSubscriptions = createAsyncThunk(
  'subscription/getUserSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Subscription[]>('/api/v1/subscription/subscriptions/my_subscriptions/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Erro ao obter assinaturas');
    }
  }
);

// Criar assinatura
export const createSubscription = createAsyncThunk(
  'subscription/createSubscription',
  async (subscriptionData: Partial<Subscription>, { rejectWithValue }) => {
    try {
      const response = await api.post<Subscription>('/api/v1/subscription/subscriptions/', subscriptionData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Erro ao criar assinatura');
    }
  }
);

// Cancelar assinatura
export const cancelSubscription = createAsyncThunk(
  'subscription/cancelSubscription',
  async (subscriptionId: number, { rejectWithValue }) => {
    try {
      const response = await api.post<CancelResponse>(`/api/v1/subscription/subscriptions/${subscriptionId}/cancel/`);
      return { id: subscriptionId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Erro ao cancelar assinatura');
    }
  }
);

const initialState: SubscriptionState = {
  plans: [],
  activePlans: [],
  userSubscriptions: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getSubscriptionPlans
      .addCase(getSubscriptionPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscriptionPlans.fulfilled, (state, action: PayloadAction<Plan[]>) => {
        state.loading = false;
        state.plans = action.payload;
        state.error = null;
      })
      .addCase(getSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // getActivePlans
      .addCase(getActivePlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivePlans.fulfilled, (state, action: PayloadAction<Plan[]>) => {
        state.loading = false;
        state.activePlans = action.payload;
        state.error = null;
      })
      .addCase(getActivePlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // getUserSubscriptions
      .addCase(getUserSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserSubscriptions.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
        state.loading = false;
        state.userSubscriptions = action.payload;
        state.error = null;
      })
      .addCase(getUserSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // createSubscription
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubscription.fulfilled, (state, action: PayloadAction<Subscription>) => {
        state.loading = false;
        state.userSubscriptions.push(action.payload);
        state.error = null;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // cancelSubscription
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.userSubscriptions = state.userSubscriptions.map(sub => 
          sub.id === (action.payload as any).id 
            ? { ...sub, status: 'cancelled' } 
            : sub
        );
        state.error = null;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = subscriptionSlice.actions;

export default subscriptionSlice.reducer; 