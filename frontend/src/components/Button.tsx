type ButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const {
		type = "button",
		children,
		className = '',
		onClick
	} = props;

	return (
		<button
			type={type}
			className={`btn ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
