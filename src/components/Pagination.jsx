import { Button } from './shared';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <Button
        variant="ghost"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <Button
          key={num}
          variant={num === page ? 'primary' : 'ghost'}
          onClick={() => onPageChange(num)}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="ghost"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
