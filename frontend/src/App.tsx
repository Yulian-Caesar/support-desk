import {BrowserRouter as Router, Routes, Route} from 'react-router'
import { Home as HomePage } from './pages/Home'
import { Login as LoginPage } from './pages/Login'
import { Register as RegisterPage } from './pages/Register'
import { Header } from './components/Header'

function App() {

  	return <>
		<Router>
			<div className="container">
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
			</div>
		</Router>
	</>
}

export default App
