const mongoose = require('mongoose');

const Application = mongoose.model('Application', {
	fullName: { type: String, required: true },
	phone: { type: String, required: true },
	problem: String,
	createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', {
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
});

module.exports = { Application, User };
