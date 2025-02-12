import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import { Provider } from 'react-redux';
import { ReactNode } from 'react';


export const store = configureStore({
	reducer: {
		auth: authReducer
	},
});

interface AppProviderProps {
	children: ReactNode;
}

export type RootState = ReturnType<typeof store.getState>; 

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};