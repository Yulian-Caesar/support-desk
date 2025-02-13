import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Button } from './Button'

export const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {user} = useSelector((state: RootState) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return (
		<header className='header'>
			<div className="logo">
				<Link to='/'>Support Desk</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<Button>
							<FaSignOutAlt /> Logout
						</Button>
					</li>
				) : (
				<>
					<li>
						<Link to='/login'>
							<FaSignInAlt /> Login
						</Link>
					</li>
					<li>
						<Link to='/register'>
							<FaUser /> Register
						</Link>
					</li>
				</>
				)}
			</ul>
		</header>
	)
}
