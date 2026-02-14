import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: [],
      editingTransaction: null,
      filters: {
        search: '',
        type: '',
        category: '',
      },

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...updated, id } : t
          ),
        })),

      setEditingTransaction: (transaction) =>
        set({ editingTransaction: transaction }),

      clearEditingTransaction: () => set({ editingTransaction: null }),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      clearFilters: () =>
        set({ filters: { search: '', type: '', category: '' } }),

      setTransactions: (transactions) => set({ transactions }),
    }),
    {
      name: 'transactions',
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);

// --- Derived selectors (computed, never stored) ---

export const selectFilteredTransactions = (state) => {
  const { transactions, filters } = state;
  const { search, type, category } = filters;

  if (!search && !type && !category) return transactions;

  return transactions.filter(
    (t) =>
      (!search || t.description.toLowerCase().includes(search.toLowerCase())) &&
      (!type || t.type === type) &&
      (!category || t.category === category)
  );
};

const sumByType = (transactions, targetType) =>
  transactions.reduce(
    (sum, t) => (t.type === targetType ? sum + Number(t.amount) : sum),
    0
  );

export const selectIncome = (state) => sumByType(state.transactions, 'income');

export const selectExpense = (state) =>
  sumByType(state.transactions, 'expense');

export const selectBalance = (state) =>
  selectIncome(state) - selectExpense(state);

export default useTransactionStore;
