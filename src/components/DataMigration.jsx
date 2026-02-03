import useTransactionsStore from '../store/transactionsStore';
import { Button } from './shared';
const DataMigration = () => {
    const { transactions, setTransactions } = useTransactionsStore();

    const importData = () => {
        const file = document.createElement('input');
        file.type = 'file';
        file.accept = 'application/json';
        file.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setTransactions(JSON.parse(e.target.result));
            }
            reader.readAsText(file);
        }
        file.click();
    }
    const exportData = () => {
        const data = JSON.stringify(transactions);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.json';
        a.click();
    }

    return <div className="flex flex-row gap-2">
        <Button onClick={importData}>Import Data</Button>
        <Button onClick={exportData}>Export Data</Button>
    </div>
}

export default DataMigration;