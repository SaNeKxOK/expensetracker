const RadioGroup = ({ label, options, direction = 'row', ...props }) => {
    return <div className="flex flex-col gap-2">
        <label htmlFor={props.id}>{label}</label>
        <div className={`flex flex-${direction} gap-2`}>
            {options.map((option) => (
                <label key={option.value}>
                    <input type="radio" {...props} value={option.value} />
                    {option.label}
                </label>
            ))}
        </div>
    </div>
}

export default RadioGroup;