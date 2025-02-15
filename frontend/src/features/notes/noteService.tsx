import axios from 'axios'

const API_URL = 'http://localhost:5000/api/tickets'

// get ticket notes
const getNotes = async(ticketId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.get(`${API_URL}/${ticketId}/notes`, config)
	return response.data
}

// create ticket note
const createNote = async(noteText: string,ticketId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.post(`${API_URL}/${ticketId}/notes`,{
		text: noteText
	}, config)
	return response.data
}

const noteService = {
	getNotes,
	createNote
}

export default noteService;