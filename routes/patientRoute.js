const router = require('express').Router()
const PatientModel = require('../models/Patient')
const DoctorModel = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const AppointmentModel = require('../models/Appointment')

const getToken = (req, res, next) => {
	const token = req.cookies['patient-auth-token']
	if (!token || token.length === 0) return next()
	req.patientId = jwt.verify(token, secret)
	next()
}

router.use(getToken)

router.get('/', (req, res) => {
	if (!req.patientId) return res.redirect('./login')
	res.send('Hello from Patient HomePage')
})

router.get('/register', (req, res) => {
	if (req.patientId) return res.redirect('./')
	res.send('patient register page')
})
router.post('/register', async (req, res) => {
	const patient = new PatientModel(req.body)
	await patient.save()
	const token = jwt.sign({ id: patient.id }, secret)
	res.cookie('patient-auth-token', token)
	res.status(200).send({ msg: 'patient created successfully!' })
})
router.get('/login', (req, res) => {
	if (req.patientId) return res.redirect('./')
	res.send('patient Login...')
})
router.post('/login', async (req, res) => {
	if (req.patientId)
		return res.status(409).send({ msg: 'patient already logged in' })
	const { email, password } = req.body
	const patient = await PatientModel.findOne({ email })
	if (!patient || patient.password !== password)
		return res.status(400).send({ msg: 'wrong email or password.' })
	const token = jwt.sign({ id: patient.id }, secret)
	res.cookie('patient-auth-token', token)
	res.status(200).send({ msg: 'patient login successful.' })
})
router.get('/schedule-appointment', (req, res) => {
	if (!req.patientId) return res.redirect('./login')
	res.send('patient appointment scheduling...')
})
router.post('/schedule-appointment', async (req, res) => {
	if (!req.patientId) return res.status(401).send({ msg: 'Unauthorized' })
	const appointment = new AppointmentModel(req.body)
	await appointment.save()
	const patient = await PatientModel.findOne({ id: req.patientId })
	patient.appointments.push(appointment)
	await patient.save()
	const doctor = await DoctorModel.findOne({ id: appointment.doctor })
	doctor.appointments.push(appointment)
	await doctor.save()
	res.status(200).send({ msg: 'appointment booked' })
})
router.get('/appointments', async (req, res) => {
	if(!req.patientId) return res.redirect('./login')
	const patient = await PatientModel.findOne({ id: req.patientId }).populate('appointments')
	res.json(patient.appointments)
})
router.get('/logout', (req, res) => {
	res.cookie('patient-auth-token', '')
	return res.status(200).redirect('./login')
})

module.exports = router
