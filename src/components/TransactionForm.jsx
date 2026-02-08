import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useTransactionStore from '../store/transactionsStore';
import transactionSchema from '../validations/transactions';
import { typeOptions, categoryOptions } from '../constants/transactionOptions';
import { Button, Input, RadioGroup, Select, DateInput } from './shared';

const createInitialValues = () => ({
  description: '',
  amount: 0,
  type: 'income',
  category: '',
  date: new Date().toISOString().split('T')[0],
});

const TransactionForm = () => {
  const {
    addTransaction,
    editingTransaction,
    clearEditingTransaction,
    updateTransaction,
    clearFilters,
  } = useTransactionStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: createInitialValues(),
    resolver: zodResolver(transactionSchema),
  });

  useEffect(() => {
    if (editingTransaction) {
      reset(editingTransaction);
    }
  }, [editingTransaction, reset]);

  const onSubmit = (data) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    } else {
      addTransaction({ ...data, id: crypto.randomUUID() });
    }
    reset(createInitialValues());
    clearEditingTransaction();
    clearFilters();
  };

  return (
    <form className="card p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold">
        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
      <Input
        label="Description"
        {...register('description')}
        error={errors.description}
      />
      <Input
        label="Amount"
        {...register('amount')}
        type="number"
        error={errors.amount}
      />
      <RadioGroup label="Type" options={typeOptions} {...register('type')} />
      <Select
        label="Category"
        options={categoryOptions}
        {...register('category')}
      />
      <DateInput label="Date" {...register('date')} />
      <div className="flex gap-2">
        {editingTransaction && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => clearEditingTransaction()}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          {editingTransaction ? 'Update' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
