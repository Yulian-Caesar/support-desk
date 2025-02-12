import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { RegisterFormConfirmType } from "../types"
import {toast} from 'react-toastify'
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useSelector, useDispatch } from "react-redux"
import { register } from "../features/auth/authSlice"
import { RootState } from "../store"


export const Register = () => {
	const [formData, setFormData] = useState<RegisterFormConfirmType>({
		name: '',
		email: '',
		password: '',
		password2: ''
	})
	const {name, email, password, password2} = formData;

	const dispatch = useDispatch()
	const {user, isLoading, isSuccess, message} = useSelector((state: RootState) => state.auth)

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
		} else {
			const userData = {
				name,
				email,
				password
			}

			dispatch(register(userData))
		}
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
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
