import useTransactionsStore from '../store/transactionsStore';

export default function Balance() {
    const { balance, income, expense } = useTransactionsStore();

    return <section className="flex flex-col border-2 border-gray-300 rounded-md w-full">
        <div className="px-4 py-2 border-b-2 border-gray-300">BALANCE: ₴ {balance}</div>
        <div className="flex flex-row ">
           <div className="flex-1 text-green-500 px-4 py-2 border-r-2 border-gray-300">↑ INCOME ₴{income}</div>
           <div className="flex-1 text-red-500 px-4 py-2">↓ EXPENSES ₴{expense}</div>
      </div>
    </section>
}