import { useState, useMemo } from 'react';
import useTransactionStore from '../store/transactionsStore';
import TransactionFilters from './TransactionFilters';
import TransactionItem from './TransactionItem';
import Pagination from './Pagination';

const PAGE_SIZE = 5;

const TransactionList = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const filters = useTransactionStore((state) => state.filters);
  const setEditingTransaction = useTransactionStore(
    (state) => state.setEditingTransaction
  );
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const { search, type, category } = filters;
    if (!search && !type && !category) return transactions;
    return transactions.filter(
      (t) =>
        (!search ||
          t.description.toLowerCase().includes(search.toLowerCase())) &&
        (!type || t.type === type) &&
        (!category || t.category === category)
    );
  }, [transactions, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return (
    <div className="space-y-3">
      <TransactionFilters />
      {paged.length === 0 && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
          No transactions yet
        </p>
      )}
      {paged.map((t) => (
        <TransactionItem
          key={t.id}
          {...t}
          onEdit={() => setEditingTransaction(t)}
          onDelete={removeTransaction}
        />
      ))}
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TransactionList;
