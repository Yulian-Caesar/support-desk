import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { RegisterFormConfirmType } from "../types"
import {toast} from 'react-toastify'
import { Input } from "../components/Input"
import { Button } from "../components/Button"


export const Register = () => {
	const [formData, setFormData] = useState<RegisterFormConfirmType>({
		name: '',
		email: '',
		password: '',
		password2: ''
	})
	const {name, email, password, password2} = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
		console.log(e.target.value)
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if(password !== password2) {
			toast.error('Passwords do not match')
		}
	}

	return (
		<>
			<section className="heading">
				<h1><FaUser /> Register</h1>
				<p>Please create an account</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<Input 
							id='name'
							name='name'
							value={name}
							onChange={onChange}
							placeholder="Enter your name"
							required
						/>
					</div>
					<div className="form-group">
						<Input 
							type="email"
							id='email'
							name='email'
							value={email}
							onChange={onChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="form-group">
						<Input 
							type="password"
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder="Enter password"
							required
						/>
					</div>
					<div className="form-group">
						<Input 
							type="password"
							id='password2'
							name='password2'
							value={password2}
							onChange={onChange}
							placeholder="Confirm password"
							required
						/>
					</div>
					<div className="form-group">
						<Button type="submit" className="btn-block" text="Submit" />
					</div>
				</form>
			</section>
		</>
	)
}
