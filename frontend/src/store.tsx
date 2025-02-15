import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import ticketReducer from './features/tickets/ticketSlice'
import noteReducer from './features/notes/noteSlice'
import { Provider } from 'react-redux';
import { ReactNode } from 'react';


export const store = configureStore({
	reducer: {
		auth: authReducer,
		tickets: ticketReducer,
		notes: noteReducer
	},
});

interface AppProviderProps {
	children: ReactNode;
}

export type RootState = ReturnType<typeof store.getState>; 

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};