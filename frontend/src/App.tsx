import {BrowserRouter as Router, Routes, Route} from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Home as HomePage } from './pages/Home'
import { Login as LoginPage } from './pages/Login'
import { Register as RegisterPage } from './pages/Register'
import { NewTicket as  NewTicketPage} from './pages/NewTicket'
import { Header } from './components/Header'
import { PrivateRoute } from './components/PrivateRoute'
import { Tickets as TicketsPage } from './pages/Tickets'


function App() {

  	return <>
		<Router>
			<div className="container">
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/new-ticket' element={<PrivateRoute />}>
						<Route path='/new-ticket' element={<NewTicketPage />} />
					</Route>
					<Route path='/tickets' element={<PrivateRoute />}>
						<Route path='/tickets' element={<TicketsPage />} />
					</Route>
				</Routes>
			</div>
		</Router>
		<ToastContainer />
	</>
}

export default App
