const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'PatientModel',
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'DoctorModel',
	},
	date: {
		type: String,
		required: true,
	},
	concern: {
		type: String,
		required: true,
	},
	diagnosis: {
		type: String
	},
	prescription: {
		type: String
	},
	done: {
		type: Boolean,
		default: false,
	},
})

const AppointmentModel = new mongoose.model(
	'appointment',
	AppointmentSchema
)

module.exports = AppointmentModel
