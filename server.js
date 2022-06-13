if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const doctorRouter = require('./routes/doctorRoute')
const patientRouter = require('./routes/patientRoute')
const cookieParser = require('cookie-parser')

// middleware setup
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(cookieParser)

// mongodb setup
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('open', () => console.log('Successfully Connected to MongoDB....'))
db.on('error', (err) => console.log(err))


// routes
app.use('/d', doctorRouter)
app.use('/p', patientRouter)

app.get('/', (req, res) => {
	res.send('Hello There')
})

app.listen(PORT, () =>
	console.log('Server is Listening at http://localhost:' + PORT)
)
