import useTransactionsStore from '../store/transactionsStore';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from './shared';
import dayjs from 'dayjs';

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

const TransactionList = () => {
    const { transactions } = useTransactionsStore();
    const { setEditingTransaction, removeTransaction } = useTransactionsStore();

    return <div className="flex flex-col gap-2">
        {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} editTransaction={setEditingTransaction.bind(null, transaction)} deleteTransaction={removeTransaction} />
        ))}
    </div>
}

export default TransactionList;