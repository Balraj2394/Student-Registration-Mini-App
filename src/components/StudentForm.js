import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentForm({ students = [], onAdd, apiBase }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const { name, email, phone } = form;

    if (!name || !name.trim()) return 'Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';

    // PHONE VALIDATION
    if (!phone || !phone.trim()) return 'Mobile number is required';
    if (!/^[0-9]+$/.test(phone)) return 'Phone must contain numbers only';

    

    if (phone.length !== 10) return 'Mobile number must be exactly 10 digits';

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.replace(/\D/g, '');

    const emailExists = students.some(
      s => (s.email || '').trim().toLowerCase() === normalizedEmail
    );
    if (emailExists) return 'Email already registered';

    const phoneExists = students.some(
      s => (s.phone || '').replace(/\D/g, '') === normalizedPhone
    );
    if (phoneExists) return 'Phone already registered';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add student');

      onAdd && onAdd(data);
      setForm({ name: '', email: '', phone: '' });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mb-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="text-primary mb-3">Add Student</h4>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Student Name"
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <label>Name</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <label>Email</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    maxLength={10}
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                  <label>Mobile</label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Student"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
