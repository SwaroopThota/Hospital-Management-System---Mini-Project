const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
	name: {
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
    appointments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'AppointmentModel'
    },
	date: {
		type: String,
		default: Date.now,
	},
})

const DoctorModel = new mongoose.model('DoctorModel', DoctorSchema)

module.exports = DoctorModel
