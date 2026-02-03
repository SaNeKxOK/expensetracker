import { create } from 'zustand';

const useTransactionsStore = create((set) => ({
  transactions: [],
  balance: 0,
  income: 0,
  expense: 0,
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
      balance: state.balance + transaction.amount,
      income:
        transaction.amount > 0
          ? state.income + transaction.amount
          : state.income,
      expense:
        transaction.amount < 0
          ? state.expense - transaction.amount
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
}));

export default useTransactionsStore;
