import { Download, Upload } from 'lucide-react';
import useTransactionStore from '../store/transactionsStore';

const isValidTransaction = (t) =>
  t &&
  typeof t.id === 'string' &&
  typeof t.description === 'string' &&
  typeof t.amount === 'number' &&
  ['income', 'expense'].includes(t.type) &&
  typeof t.category === 'string' &&
  typeof t.date === 'string';

const DataMigration = () => {
  const { transactions, setTransactions } = useTransactionStore();

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (!Array.isArray(parsed) || !parsed.every(isValidTransaction)) {
            throw new Error('Invalid format');
          }
          setTransactions(parsed);
        } catch {
          alert(
            'Invalid file format. Please select a valid transactions JSON file.'
          );
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={importData}
        className="btn-icon"
        aria-label="Import data"
      >
        <Upload className="w-4 h-4" />
      </button>
      <button
        onClick={exportData}
        className="btn-icon"
        aria-label="Export data"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DataMigration;
