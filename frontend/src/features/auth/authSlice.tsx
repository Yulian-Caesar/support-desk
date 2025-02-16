
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { AxiosError } from 'axios';

type User = {
	name: string;
	email: string;
}

// Get user from localstorage
const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
	user: user || null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}


// Register new user
export const register = createAsyncThunk('auth/register', async(user: User, thunkAPI) => {
	try {
		return await authService.register(user)
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}

		// If it's not an AxiosError, return a generic error message
		return thunkAPI.rejectWithValue('An unexpected error occurred');
	}
})


// Login user
export const login = createAsyncThunk('auth/login', async(user: User, thunkAPI) => {
	try {
		return await authService.login(user)
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}

		// If it's not an AxiosError, return a generic error message
		return thunkAPI.rejectWithValue('An unexpected error occurred');
	}
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async() => {
	await authService.logout()
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
	}
})

export const {reset} = authSlice.actions
export default authSlice.reducer;