import React, { useEffect, useState } from 'react';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';


const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';


export default function Home() {
const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(true);


const fetchStudents = async () => {
try {
setLoading(true);
const res = await fetch(`${API}/students`);
const data = await res.json();
setStudents(data);
} catch (err) {
console.error('Fetch students error', err);
} finally {
setLoading(false);
}
};


useEffect(() => {
fetchStudents();
}, []);


const handleAdd = (student) => {
// prepend to list
setStudents(prev => [student, ...prev]);
};


const handleDelete = (id) => {
setStudents(prev => prev.filter(s => s._id !== id));
};


return (
	<div className="container">
		<h2 className="page-title">Student Registration Mini App</h2>

		<div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
			<StudentForm students={students} onAdd={handleAdd} apiBase={API} />

			<div className="card">
				<div className="controls">
					<h3 style={{ margin: 0 }}>Registered Students</h3>
				</div>
				{loading ? (
					<div className="empty">Loading...</div>
				) : (
					<StudentTable students={students} onDelete={handleDelete} apiBase={API} />
				)}
			</div>
		</div>
	</div>
);
}