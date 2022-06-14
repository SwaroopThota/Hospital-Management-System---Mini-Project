const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	dob: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	bloodgroup: {
		type: String,
	},
	appointments: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'AppointmentModel',
	},
	date: {
		type: String,
		default: Date.now,
	},
})

const PatientModel = new mongoose.model('patient', PatientSchema)

module.exports = PatientModel
