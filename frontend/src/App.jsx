import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormPage from './components/FormPage/FormPage';
import LoginPage from './components/LoginPage/LoginPage';
import ApplicationsTable from './components/ApplicationsTable/ApplicationsTable';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<FormPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/applications" element={<ApplicationsTable />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
