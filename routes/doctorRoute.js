const router = require('express').Router()

const getToken = (req, res, next) => {
	const token = req.cookies['patient-auth-token']
	if (!token) next()
	req.userId = jwt.verify(token, secret)
	next()
}

router.use(getToken)

router.get('/', (req, res) => {
	res.send('Hello from Doctor Router')
})
router.get('/login', (req, res) => {})
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	const doctor = await DoctorModel.find({ email })
	if (!patient || patient.password !== password) return res.redirect('/login')
	const token = jwt.sign({ id: patient.id }, secret)
	res.cookie('patient-auth-token', token)
	res.redirect('/')
})
router.get('/appointments', (req, res) => {})
router.get('/diagnose/:id', (req, res) => {})
router.post('/diagnose/:id', (req, res) => {})

module.exports = router
