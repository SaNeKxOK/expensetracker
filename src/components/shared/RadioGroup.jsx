import clsx from 'clsx';

const RadioGroup = ({ label, options, direction = 'row', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div
        className={clsx(
          'flex gap-3',
          direction === 'col' ? 'flex-col' : 'flex-row'
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
          >
            <input
              type="radio"
              {...props}
              value={option.value}
              className="accent-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
