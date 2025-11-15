import React, { useState } from "react";

export default function StudentTable({ students = [], onDelete, apiBase }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`${apiBase}/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      if (onDelete) onDelete(id);
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const studentList = Array.isArray(students)
    ? students
    : students?.data || students?.students || students?.result || [];

  if (!studentList.length)
    return (
      <div className="card shadow-sm p-4 text-center mt-4">
        <h5 className="text-muted">No students added yet.</h5>
      </div>
    );

  return (
    <div className="card shadow-sm mt-4 p-3">
      <h4 className="mb-3 fw-bold">Student List</h4>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "20%" }}>Phone</th>
              <th style={{ width: "15%" }} className="text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {studentList.map((s) => (
              <tr key={s._id || s.id}>
                <td className="fw-semibold">{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(s._id || s.id)}
                    className="btn btn-danger btn-sm px-3"
                    disabled={deletingId === (s._id || s.id)}
                  >
                    {deletingId === (s._id || s.id) ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
