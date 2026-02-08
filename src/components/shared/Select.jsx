const Select = ({
  label,
  options,
  defaultLabel = 'Select an option',
  ...props
}) => {
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
      <select className="input-base" {...props}>
        <option value="">{defaultLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
