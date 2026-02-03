const Select = ({ label, options, defaultLabel = 'Select an option', ...props }) => {
    return <div className="flex flex-col gap-2 rounded-md text-gray-500">
        <label className="text-sm font-medium" htmlFor={props.id}>{label}</label>
        <select className="input-base" {...props}>
            <option value="" selected>{defaultLabel}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
}

export default Select;