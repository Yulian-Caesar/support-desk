import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ticketService from './ticketService'
import { AxiosError } from 'axios'
import { TicketFormType, TicketsType } from '../../types'

const initialState: TicketsType = {
	tickets: [],
	ticket: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk('tickets/create', async(ticketData: TicketFormType, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await ticketService.createTicket(ticketData, token)
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}

		// If it's not an AxiosError, return a generic error message
		return thunkAPI.rejectWithValue('An unexpected error occurred');
	}
})

// Get user tickets
export const getTickets = createAsyncThunk('tickets/getAll', async(_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await ticketService.getTickets(token)
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}

		// If it's not an AxiosError, return a generic error message
		return thunkAPI.rejectWithValue('An unexpected error occurred');
	}
})

export const ticketSlice = createSlice({
	name: 'ticket',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true;
			}) 
			.addCase(createTicket.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true
			}) 
			.addCase(createTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload
			})
			.addCase(getTickets.pending, (state) => {
				state.isLoading = true;
			}) 
			.addCase(getTickets.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true
				state.tickets = action.payload;
			}) 
			.addCase(getTickets.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload
			}) 
	}
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer