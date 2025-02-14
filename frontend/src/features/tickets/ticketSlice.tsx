import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ticketService from './ticketService'
import { AxiosError } from 'axios'

const initialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk('tickets/create', async(ticketData, thunkAPI) => {
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
	}
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer