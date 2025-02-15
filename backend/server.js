const express = require('express')
const path = require('path')
const colors = require('colors')
const doteenv = require('dotenv').config()
const PORT = process.env.PORT || 5173;
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors');

// Connect to Database
connectDB()


const app = express();

// Enable CORS for all domains
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, '../frontend/dist')))

	app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'dist', 'index.html'))
} else {
	app.get('/', (req, res) => {
		res.status(200).json({message: 'Welcome to the Support Desk API'})
	})
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))