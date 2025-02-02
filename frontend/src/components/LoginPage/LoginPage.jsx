import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import PropTypes from 'prop-types';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/auth/login', {
				email,
				password,
			});

			localStorage.setItem('token', response.data);
			navigate('/applications');
		} catch (err) {
			alert('Ошибка авторизации');
			console.log('Ошибка авторизации', err);
		}
	};
	const handleToMainPage = () => navigate('/');
	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Пароль:</label>
					<input
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
				</div>

				<button type="submit">Войти</button>
			</form>
			<button className={styles.mainPageButton} onClick={handleToMainPage}>
				На страницу формы
			</button>
		</div>
	);
};

LoginPage.propTypes = {
	email: PropTypes.string,
	password: PropTypes.string,
	navigate: PropTypes.func,
};

export default LoginPage;
