import useTransactionStore from '../store/transactionsStore';
import { typeOptions, categoryOptions } from '../constants/transactionOptions';
import { Input, Select } from './shared';

const TransactionFilters = () => {
  const { filters, setFilters } = useTransactionStore();

  return (
    <div className="flex gap-2">
      <Input
        label="Search"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <Select
        label="Type"
        options={typeOptions}
        value={filters.type || ''}
        defaultLabel="All"
        onChange={(e) => setFilters({ type: e.target.value })}
      />
      <Select
        label="Category"
        options={categoryOptions}
        value={filters.category || ''}
        defaultLabel="All"
        onChange={(e) => setFilters({ category: e.target.value })}
      />
    </div>
  );
};

export default TransactionFilters;
