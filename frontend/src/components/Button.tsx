type ButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const {
		type = "button",
		children,
		className = '',
	} = props;

	return (
		<button
			type={type}
			className={`btn ${className}`}
		>
			{children}
		</button>
	)
}
