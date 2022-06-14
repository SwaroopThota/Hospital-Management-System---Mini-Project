const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const AppointmentModel = require('../models/Appointment')
const DoctorModel = require('../models/Doctor')

const getToken = (req, res, next) => {
	const token = req.cookies['doctor-auth-token']
	if (!token) return next()
	req.doctorId = jwt.verify(token, secret)
	next()
}

router.use(getToken)

router.get('/', (req, res) => {
	if (!req.doctorId) return res.redirect('./login')
	res.send('Hello from Doctor homepage')
})
router.get('/login', (req, res) => {
	if(req.doctorId) return res.redirect('./')
	res.send('Doctor login page.')
})
router.post('/login', async (req, res) => {
	if(req.doctorId) 
		return res.status(409).send({ msg: 'doctor already logged in' })
	const { email, password } = req.body
	const doctor = await DoctorModel.findOne({ email })
	if (!doctor || doctor.password !== password) 
		return res.status(400).send({ msg: 'wrong email or password.' })
	const token = jwt.sign({ id: doctor.id }, secret)
	res.cookie('doctor-auth-token', token)
	res.status(200).send({ msg: 'doctor login successful.' })
})
router.get('/appointments', async (req, res) => {
	if(!req.doctorId) return res.redirect('./login')
	const doctor = await DoctorModel.findOne({ id: req.doctorId }).populate('appointments')
	res.json(doctor.appointments)
})
router.get('/diagnose/:id', (req, res) => {})
router.post('/diagnose/:id', (req, res) => {})

module.exports = router
