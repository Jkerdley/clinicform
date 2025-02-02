import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import axios from 'axios';
import styles from './FormPage.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
	fullName: yup.string().required('Это обязательное поле'),
	phone: yup
		.string()
		.matches(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, 'Неправильный формат')
		.required('Это обязательное поле'),
});

const FormPage = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			await axios.post('http://localhost:5000/applications', data);
			alert('Заявка успешно отправлена!');
			reset();
		} catch (err) {
			alert('Ошибка отправки заявки');
			console.log('Ошибка отправки заявки', err);
		}
	};
	const isAuthenticated = localStorage.getItem('token');
	const route = isAuthenticated ? '/applications' : '/login';
	const handleLogin = () => navigate(route);

	return (
		<>
			<div className={styles.container}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.formGroup}>
						<label>ФИО:</label>
						<input {...register('fullName')} className={errors.fullName ? styles.error : ''} />
						{errors.fullName && <span>{errors.fullName.message}</span>}
					</div>

					<div className={styles.formGroup}>
						<label>Телефон:</label>
						<InputMask
							mask="+7 999 999 99 99"
							{...register('phone')}
							className={errors.phone ? styles.error : ''}
						>
							{(inputProps) => <input {...inputProps} type="text" />}
						</InputMask>
						{errors.phone && <span>{errors.phone.message}</span>}
					</div>

					<div className={styles.formGroup}>
						<label>Проблема:</label>
						<textarea {...register('problem')} />
					</div>

					<button type="submit">Отправить</button>
				</form>
			</div>
			<button className={styles.loginButton} onClick={handleLogin}>
				{isAuthenticated ? 'Проверить таблицу записей' : 'Войти в личный кабинет'}
			</button>
		</>
	);
};

FormPage.propTypes = {
	register: PropTypes.func,
	handleSubmit: PropTypes.func,
	errors: PropTypes.object,
	reset: PropTypes.func,
};

export default FormPage;
