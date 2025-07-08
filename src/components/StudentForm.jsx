// components/StudentForm.jsx
import React from "react";
import { Save, X } from "lucide-react";
import { departments, years } from "../data/studentData";

const StudentForm = ({
  showAddForm,
  editingStudent,
  formData,
  handleInputChange,
  handleAddStudent,
  handleUpdateStudent,
  handleCancelEdit,
}) => {
  
  if (!showAddForm && editingStudent === null) return null;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          className="px-4 py-2 border rounded-lg"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="regNo"
          placeholder="Registration No"
          className="px-4 py-2 border rounded-lg"
          value={formData.regNo}
          onChange={handleInputChange}
          required
        />
        <select
          name="dept"
          className="px-4 py-2 border rounded-lg"
          value={formData.dept}
          onChange={handleInputChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          name="year"
          className="px-4 py-2 border rounded-lg"
          value={formData.year}
          onChange={handleInputChange}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          className="px-4 py-2 border rounded-lg"
          value={formData.marks}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-4 py-2 border rounded-lg"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="px-4 py-2 border rounded-lg"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="px-4 py-2 border rounded-lg"
          value={formData.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="parentName"
          placeholder="Parent Name"
          className="px-4 py-2 border rounded-lg"
          value={formData.parentName}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="parentPhone"
          placeholder="Parent Phone"
          className="px-4 py-2 border rounded-lg"
          value={formData.parentPhone}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="attendance"
          placeholder="Attendance %"
          className="px-4 py-2 border rounded-lg"
          value={formData.attendance}
          onChange={handleInputChange}
        />
        <select
          name="status"
          className="px-4 py-2 border rounded-lg"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          <Save className="h-4 w-4 mr-2" />
          {editingStudent ? "Update" : "Add"} Student
        </button>
        <button
          onClick={handleCancelEdit}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StudentForm;
