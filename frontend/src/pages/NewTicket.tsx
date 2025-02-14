import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useState } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export const NewTicket = () => {
	const {user} = useSelector((state: RootState) => state.auth)
	const [name] = useState(user ? user.name : '')
	const [email] = useState(user ? user.email : '')

	const [product, setProduct] = useState('iPhone')
	const [description, setDescription] = useState('')

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	return (
		<>
			<section className="headign">
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className="form">
				<div className="form-group">
					<label htmlFor="name">Customer Name</label>
					<Input 
						id="name"
						name="name"
						value={name}
						disabled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Customer Email</label>
					<Input 
						id="email"
						name="email"
						value={email}
						disabled
					/>
				</div>

				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="product">Product</label>
						<select id="product" name="product" value={product} onChange={(e) => setProduct(e.target.value)}>
							<option value='iPhone'>iPhone</option>
							<option value='Macbook Pro'>Macbook Pro</option>
							<option value='iMac'>iMac</option>
							<option value='iPad'>iPad</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea 
							id="description"
							name="description"
							className="form-control"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<Button className="btn-block">Submit</Button>
					</div>
				</form>
			</section>
		</>
	)
}
