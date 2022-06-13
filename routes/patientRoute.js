const PatientModel = require('../models/Patient')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const router = require('express').Router()

// const getToken = (req, res, next) => {
// 	const token = req.cookies['patient-auth-token']
// 	if (!token) return next()
// 	req.userId = jwt.verify(token, secret)
// 	next()
// }

// router.use(getToken)

router.get('/', (req, res) => {
    // if(!req.userId) return res.redirect('/login')
	res.send('Hello from Patient Router')
})

router.get('/register', (req, res) => {
    if (req.userId) return res.redirect('/')
})
router.post('/register', async (req, res) => {
    console.log("first")
	const patient = new PatientModel(req.body)
	await patient.save()
	const token = jwt.sign({ id: patient.id }, secret)
	res.cookie('patient-auth-token', token)
    res.send(token)
	// res.redirect('/')
})
router.get('/login', (req, res) => {
    if (req.userId) return res.redirect('/')
})
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	const patient = await PatientModel.find({ email })
	if (!patient || patient.password !== password) return res.redirect('/login')
	const token = jwt.sign({ id: patient.id }, secret)
	res.cookie('patient-auth-token', token)
	res.redirect('/')
})
router.get('/schedule-appointement', (req, res) => {})
router.post('/schedule-appointement', (req, res) => {})
router.get('/appointments', (req, res) => {})

module.exports = router
