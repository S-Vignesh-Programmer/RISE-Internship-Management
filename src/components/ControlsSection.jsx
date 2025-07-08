// components/ControlsSection.jsx
import React from "react";
import { Search, Plus, Download, FileText, Eye } from "lucide-react";
import { departments, years } from "../data/studentData";

const ControlsSection = ({
  searchTerm,
  setSearchTerm,
  filterDept,
  setFilterDept,
  filterYear,
  setFilterYear,
  viewMode,
  setViewMode,
  selectedStudents,
  setShowAddForm,
  handleExportCSV,
  handleGenerateReport,
  handleBulkDelete,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl/10  mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setViewMode(viewMode === "table" ? "cards" : "table")
              }
              className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              {viewMode === "table" ? "Card View" : "Table View"}
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={handleGenerateReport}
              className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FileText className="h-4 w-4 mr-2" />
              Report
            </button>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </button>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {selectedStudents.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-600">
              {selectedStudents.length} student(s) selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsSection;
