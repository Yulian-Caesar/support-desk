type ButtonProps = {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const {
		type = "button",
		text,
		className = '',
	} = props;

	return (
		<button
			type={type}
			className={`btn ${className}`}
		>
			{text}
		</button>
	)
}
