const Input = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      )}
      <input className="input-base" {...props} />
      {error && <p className="text-sm text-expense">{error.message}</p>}
    </div>
  );
};

export default Input;
