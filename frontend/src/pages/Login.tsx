import { useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { LoginFormType } from "../types"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { RootState } from "../store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"


export const Login = () => {
	const [formData, setFormData] = useState<LoginFormType>({
		email: '',
		password: '',
	})
	const {email, password} = formData;

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {user, isLoading, isSuccess, message, isError} = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		if(isError) {
			toast.error(message)
		}

		// Redirect when logged in
		if(isSuccess || user) {
			navigate('/')
		}

		dispatch(reset())
	}, [isError, message, isSuccess, user, navigate, dispatch])

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const userData = {
			email,
			password
		}

		dispatch(login(userData))
	}

	if(isLoading) return <Spinner />

	return (
		<>
			<section className="heading">
				<h1><FaSignInAlt /> Login</h1>
				<p>Please log in to get support</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
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
						<Button type="submit" className="btn-block">Submit</Button>
					</div>
				</form>
			</section>
		</>
	)
}
