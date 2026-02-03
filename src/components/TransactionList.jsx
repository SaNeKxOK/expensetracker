import useTransactionsStore from '../store/transactionsStore';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from './shared';
import dayjs from 'dayjs';
import { Input, Select } from './shared';
import { typeOptions, typeCategoriesOptions } from './TransactionForm';
import { useState, useEffect } from 'react';
const TransactionItem = ({ id, description, amount, type, category, date, editTransaction, deleteTransaction }) => {
    return <div className="flex flex-row justify-between items-center border-1 border-gray-300 rounded-md p-4">
        <div>{description}</div>
        <div>{amount}</div>
        <div>{type}</div>
        <div>{category}</div>
        <div>{dayjs(date).format('DD/MM/YYYY')}</div>
        <div className="flex flex-row gap-2">
            <Button onClick={editTransaction}><PencilIcon /></Button>
            <Button onClick={() => deleteTransaction(id)}><TrashIcon /></Button>
        </div>
    </div>
}

const TransactionFilters = () => {
    const { filters, filterTransactions } = useTransactionsStore();
    return <div className="flex flex-row gap-2 mb-4">
        <Input label="Search" value={filters.search} onChange={(e) => filterTransactions({ ...filters, search: e.target.value })} />
        <Select label="Type" options={typeOptions} value={filters.type || ''} defaultLabel="All" onChange={(e) => filterTransactions({ ...filters, type: e.target.value })} />
        <Select label="Category" options={typeCategoriesOptions} value={filters.category || ''} defaultLabel="All" onChange={(e) => filterTransactions({ ...filters, category: e.target.value })} />
    </div>
}

const pageSize = 1;

const Pagination = ({ page, setPage, totalPages }) => {
    return <div className="flex flex-row gap-2 justify-end">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
        {new Array(totalPages).fill(0).map((_, index) => (
            <Button key={index} onClick={() => setPage(index + 1)} disabled={page === index + 1}>{index + 1}</Button>
        ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</Button>
    </div>
}

const TransactionList = () => {
    const { filteredTransactions } = useTransactionsStore();
    const { setEditingTransaction, removeTransaction } = useTransactionsStore();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredTransactions.length / pageSize));
    }, [filteredTransactions]);

    return <div className="flex flex-col gap-2">
        <TransactionFilters />
        {filteredTransactions.slice((page - 1) * pageSize, page * pageSize).map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} editTransaction={setEditingTransaction.bind(null, transaction)} deleteTransaction={removeTransaction} />
        ))}
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
}

export default TransactionList;