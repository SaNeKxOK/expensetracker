import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTransactionsStore = create(persist((set) => ({
  transactions: [],
  editingTransaction: null,
  balance: 0,
  income: 0,
  expense: 0,
  setEditingTransaction: (transaction) =>
    set({ editingTransaction: transaction }),
  clearEditingTransaction: () =>
    set({ editingTransaction: null }),
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
      balance: state.balance + transaction.amount,
      income:
        transaction.type === 'income'
          ? state.income + transaction.amount
          : state.income,
      expense:
        transaction.type === 'expense'
          ? state.expense + transaction.amount
          : state.expense,
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id
      ),
      balance:
        state.balance -
        state.transactions.find((transaction) => transaction.id === id).amount,
      income:
        state.income -
          state.transactions.find((transaction) => transaction.id === id)
            .amount >
          0
          ? state.income -
          state.transactions.find((transaction) => transaction.id === id)
            .amount
          : state.income,
      expense:
        state.expense -
          state.transactions.find((transaction) => transaction.id === id)
            .amount <
          0
          ? state.expense +
          state.transactions.find((transaction) => transaction.id === id)
            .amount
          : state.expense,
    })),
  updateTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction
      ),
      balance:
        state.balance +
        updatedTransaction.amount -
        state.transactions.find((transaction) => transaction.id === id).amount,
      income:
        state.income +
          updatedTransaction.amount -
          state.transactions.find((transaction) => transaction.id === id)
            .amount >
          0
          ? state.income +
          updatedTransaction.amount -
          state.transactions.find((transaction) => transaction.id === id)
            .amount
          : state.income,
      expense:
        state.expense +
          updatedTransaction.amount -
          state.transactions.find((transaction) => transaction.id === id)
            .amount <
          0
          ? state.expense -
          updatedTransaction.amount +
          state.transactions.find((transaction) => transaction.id === id)
            .amount
          : state.expense,
    })),
}), {
  name: 'transactions'
}));

export default useTransactionsStore;
