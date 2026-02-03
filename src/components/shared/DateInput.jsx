const DateInput = ({ label, ...props }) => {
    return <div className="flex flex-col gap-2 rounded-md text-gray-500">
        <label className="text-sm font-medium" htmlFor={props.id}>{label}</label>
        <input className="input-base" {...props} type="date" />
    </div>
}

export default DateInput;