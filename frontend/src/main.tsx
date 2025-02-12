import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './store';

createRoot(document.getElementById('root')!).render(
	<AppProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</AppProvider>
)
