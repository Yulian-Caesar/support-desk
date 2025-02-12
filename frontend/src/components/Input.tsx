type InputProps = {
	value: string;
	id: string;
	name: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
	type?: string;
	className?: string;
	required?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
	const { 
		value, 
		id,
		name,
		onChange, 
		placeholder, 
		type = "text",
		className = '',
		required = false
	} = props;

	return (
		<input 
			value={value}
			id={id}
			name={name}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			className={`form-control ${className}`}
			required={required}
		/>
	)
}
