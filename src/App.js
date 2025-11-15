import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

export default function App() {
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const apiBase = "http://localhost:5000";

  const loadStudents = async () => {
    try {
      const res = await fetch(`${apiBase}/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleView = () => {
    setShowTable(true);
    loadStudents();
  };

  const handleHide = () => {
    setShowTable(false);
  };

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4 fw-bold text-primary">
        Student Registration
      </h2>

      {/* Add Student Form */}
      <StudentForm
        students={students}
        onAdd={handleAddStudent}
        apiBase={apiBase}
      />

      {/* View + Hide Buttons */}
      <div className="d-flex justify-content-between mt-4 mb-3">

        {/* Left side - View Button */}
        <button
          className="btn btn-success px-4"
          onClick={handleView}
        >
          👁 View Student List
        </button>

        {/* Right side - Hide Button */}
        <button
          className="btn btn-danger px-4"
          onClick={handleHide}
          disabled={!showTable}
        >
          ❌ Hide
        </button>

      </div>

      {/* Student Table */}
      {showTable && (
        <StudentTable
          students={students}
          onDelete={handleDeleteStudent}
          apiBase={apiBase}
        />
      )}

    </div>
  );
}
