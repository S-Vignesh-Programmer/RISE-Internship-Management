// components/StudentsCardView.jsx
import React from "react";
import { BookOpen, Mail, Phone, MapPin, Edit, Trash2 } from "lucide-react";
import { getGradeColor, getAttendanceColor } from "../utils/getGradeColor"; 

const StudentsCardView = ({
  filteredStudents,
  handleEditStudent,
  handleDeleteStudent,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredStudents.map((student) => (
        <div
          key={student.id}
          className="bg-white p-6 rounded-lg shadow-sm  hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg font-medium text-blue-600">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-500">{student.regNo}</p>
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                student.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {student.status}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {student.dept} - {student.year}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{student.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{student.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{student.address}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="flex space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(
                  student.marks
                )}`}
              >
                {student.marks}%
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(
                  student.attendance
                )}`}
              >
                {student.attendance}% att
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditStudent(student)}
                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteStudent(student.id)}
                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentsCardView;
