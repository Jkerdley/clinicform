const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Application, User } = require('./models/models');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = (req, res, next) => {
	const token = req.headers['auth-token'];
	if (!token) return res.status(401).send('Доступ запрещен');

	try {
		const verified = jwt.verify(token, 'mysecret');
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Не правильный токен');
	}
};

app.post('/applications', async (req, res) => {
	try {
		const application = new Application(req.body);
		await application.save();
		res.status(201).json(application);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.get('/applications', authMiddleware, async (req, res) => {
	try {
		const applications = await Application.find();
		res.json(applications);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.post('/auth/login', async (req, res) => {
	console.log('request (body) USER in server:', req.body);
	try {
		const user = await User.findOne({ email: req.body.email });
		console.log('user', user);
		if (!user) return res.status(400).send('Не правильные данные для входа (Логин)');

		const validPass = await bcrypt.compare(req.body.password, user.password);
		console.log('validPass', validPass);
		if (!validPass) return res.status(400).send('Не правильные данные для входа (Пароль)');

		const token = jwt.sign({ _id: user._id }, 'mysecret');
		console.log('token', token);
		res.header('auth-token', token).send(token);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

mongoose
	.connect(
		'mongodb+srv://jkerdley:3666131992iqaq@nodecluster.n0j5a.mongodb.net/cliniq?retryWrites=true&w=majority&appName=NODECluster',
	)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Сервер запущен на порту ${PORT}`);
		});
	})
	.catch((err) => console.log(err));
