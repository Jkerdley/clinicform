import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ApplicationsTable.module.css';
import PropTypes from 'prop-types';

const ApplicationsTable = () => {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await axios.get('http://localhost:5000/applications', {
					headers: { 'auth-token': localStorage.getItem('token') },
				});
				setApplications(response.data);
			} catch (err) {
				console.error('Ошибка загрузки данных:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [navigate]);

	if (loading) return <div>Загрузка...</div>;
	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr>
						<th>Дата</th>
						<th>ФИО</th>
						<th>Телефон</th>
						<th>Проблема</th>
					</tr>
				</thead>
				<tbody>
					{applications.map((app) => (
						<tr key={app._id}>
							<td>{new Date(app.createdAt).toLocaleDateString()}</td>
							<td>{app.fullName}</td>
							<td>{app.phone}</td>
							<td>{app.problem || '—'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

ApplicationsTable.propTypes = {
	applications: PropTypes.array,
	navigate: PropTypes.func,
};

export default ApplicationsTable;
