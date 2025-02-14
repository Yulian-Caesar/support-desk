import axios from 'axios'
import { TicketFormType } from '../../types'

const API_URL = 'http://localhost:5000/api/tickets'

// create new ticket 
const createTicket = async(ticketData: TicketFormType, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.post(API_URL, ticketData, config)
	return response.data
}

// get user tickets
const getTickets = async( token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.get(API_URL, config)
	return response.data
}

// get ticket
const getTicket = async(ticketId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.get(`${API_URL}/${ticketId}`, config)
	return response.data
}

// close ticket
const closeTicket = async(ticketId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.put(`${API_URL}/${ticketId}`, {status: 'closed'}, config)
	return response.data
}


const ticketService = {
	createTicket,
	getTickets,
	getTicket,
	closeTicket
}

export default ticketService;