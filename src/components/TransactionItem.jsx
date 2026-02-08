import { Pencil, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import clsx from 'clsx';

const TransactionItem = ({
  id,
  description,
  amount,
  type,
  category,
  date,
  onEdit,
  onDelete,
}) => {
  const isIncome = type === 'income';

  return (
    <div className="card p-3 flex items-center justify-between gap-3 animate-slide-in">
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{description}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {category} · {dayjs(date).format('DD/MM/YYYY')}
        </p>
      </div>
      <span
        className={clsx(
          'text-sm font-semibold tabular-nums whitespace-nowrap',
          isIncome ? 'text-income' : 'text-expense'
        )}
      >
        {isIncome ? '+' : '-'}₴{Number(amount).toFixed(2)}
      </span>
      <div className="flex gap-1">
        <button onClick={onEdit} className="btn-icon" aria-label="Edit">
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="btn-icon"
          aria-label="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
