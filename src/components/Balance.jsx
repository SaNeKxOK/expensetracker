import useTransactionStore, {
  selectBalance,
  selectIncome,
  selectExpense,
} from '../store/transactionsStore';

const Balance = () => {
  const balance = useTransactionStore(selectBalance);
  const income = useTransactionStore(selectIncome);
  const expense = useTransactionStore(selectExpense);

  return (
    <section className="card p-4 space-y-3">
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
        <p className="text-3xl font-bold tabular-nums">
          {formatCurrency(balance)}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 rounded-lg bg-income-light dark:bg-income/10 p-3 text-center">
          <p className="text-xs text-income-dark dark:text-income font-medium">
            Income
          </p>
          <p className="text-lg font-semibold text-income-dark dark:text-income tabular-nums">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex-1 rounded-lg bg-expense-light dark:bg-expense/10 p-3 text-center">
          <p className="text-xs text-expense-dark dark:text-expense font-medium">
            Expenses
          </p>
          <p className="text-lg font-semibold text-expense-dark dark:text-expense tabular-nums">
            {formatCurrency(expense)}
          </p>
        </div>
      </div>
    </section>
  );
};

const formatCurrency = (amount) => `₴${amount.toFixed(2)}`;

export default Balance;
