import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useTransactionsStore from '../store/transactionsStore';
import transactionSchema from '../validations/transactions';
import { Button, Input, RadioGroup, Select, DateInput } from './shared';

export const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
]

const categories = ["Food", "Transportation", "Housing", "Utilities", "Entertainment", "Other"];

export const typeCategoriesOptions = categories.map((category) => ({ label: category, value: category }));

const initialValues = {
    description: '',
    amount: 0,
    type: 'income',
    category: '',
    date: new Date().toISOString().split('T')[0],
}

const TransactionForm = () => {
    const { addTransaction, editingTransaction, clearEditingTransaction, updateTransaction, clearFilteredTransactions } = useTransactionsStore();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues, resolver: zodResolver(transactionSchema) });

    useEffect(() => {
        if (editingTransaction) {
            console.log(editingTransaction);
            reset(editingTransaction);
        }
    }, [editingTransaction]);

    const onSubmit = (data) => {
        if (editingTransaction) {
            updateTransaction(editingTransaction.id, data);
        } else {
            addTransaction({...data, id: crypto.randomUUID()});
        }
        reset(initialValues);
        clearEditingTransaction();
        clearFilteredTransactions();
    }

    return <form className="flex flex-col gap-4 border-2 border-gray-300 rounded-md p-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold">{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <Input label="Description" {...register('description')} error={errors.description} />
        <Input label="Amount" {...register('amount')} type="number" error={errors.amount} />
        <RadioGroup label="Type" options={typeOptions} {...register('type')} />
        <Select label="Category" options={typeCategoriesOptions} {...register('category')} />
        <DateInput label="Date" {...register('date')} />
        {editingTransaction && <Button type="button" onClick={() => clearEditingTransaction()}>Cancel</Button>}
        <Button type="submit">{editingTransaction ? 'Update Transaction' : 'Add Transaction'}</Button>
    </form>
}

export default TransactionForm;