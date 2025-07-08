import React, { useState, useEffect } from "react";
import Header from "./Header";
import StatsCards from "./StatsCards";
import NavigationTabs from "./NavigationTabs";
import ControlsSection from "./ControlsSection";
import StudentForm from "./StudentForm";
import StudentsTable from "./StudentsTable";
import StudentsCardView from "./StudentsCardView";
import AnalyticsTab from "./AnalyticsTab";
import NotificationsTab from "./NotificationsTab";
import { initialStudentData, departments, years } from "../data/studentData";

const StudentManagementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // table or cards
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    dept: "",
    year: "",
    marks: "",
    email: "",
    phone: "",
    address: "",
    parentName: "",
    parentPhone: "",
    attendance: "",
    status: "active",
  });

  // Initialize data with enhanced fields
  useEffect(() => {
    setStudents(initialStudentData);

    // Set initial notifications
    setNotifications([
      {
        id: 1,
        type: "warning",
        message: "Rajesh Patel has low attendance (76%)",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "info",
        message: "3 students need to update their contact information",
        time: "1 day ago",
      },
    ]);
  }, []);

  // Enhanced filtering with status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "" || student.dept === filterDept;
    const matchesYear = filterYear === "" || student.year === filterYear;
    return matchesSearch && matchesDept && matchesYear;
  });

  // Analytics calculations
  const getAnalytics = () => {
    const totalStudents = students.length;
    const activeStudents = students.filter((s) => s.status === "active").length;
    const avgMarks =
      students.reduce((acc, s) => acc + parseInt(s.marks), 0) / students.length;
    const avgAttendance =
      students.reduce((acc, s) => acc + parseInt(s.attendance), 0) /
      students.length;
    const lowPerformers = students.filter((s) => parseInt(s.marks) < 60).length;
    const topPerformers = students.filter(
      (s) => parseInt(s.marks) >= 90
    ).length;
    const lowAttendance = students.filter(
      (s) => parseInt(s.attendance) < 80
    ).length;

    return {
      totalStudents,
      activeStudents,
      avgMarks: Math.round(avgMarks),
      avgAttendance: Math.round(avgAttendance),
      lowPerformers,
      topPerformers,
      lowAttendance,
    };
  };

  const analytics = getAnalytics();

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new student
  const handleAddStudent = () => {
    if (
      formData.name &&
      formData.regNo &&
      formData.dept &&
      formData.year &&
      formData.marks
    ) {
      const newStudent = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      };
      setStudents([...students, newStudent]);
      setFormData({
        name: "",
        regNo: "",
        dept: "",
        year: "",
        marks: "",
        email: "",
        phone: "",
        address: "",
        parentName: "",
        parentPhone: "",
        attendance: "",
        status: "active",
      });
      setShowAddForm(false);
    }
  };

  // Edit student
  const handleEditStudent = (student) => {
    setEditingStudent(student.id);
    setFormData({ ...student });
  };

  // Update student
  const handleUpdateStudent = () => {
    if (
      formData.name &&
      formData.regNo &&
      formData.dept &&
      formData.year &&
      formData.marks
    ) {
      setStudents(
        students.map((student) =>
          student.id === editingStudent
            ? { ...formData, id: editingStudent }
            : student
        )
      );
      setEditingStudent(null);
      setFormData({
        name: "",
        regNo: "",
        dept: "",
        year: "",
        marks: "",
        email: "",
        phone: "",
        address: "",
        parentName: "",
        parentPhone: "",
        attendance: "",
        status: "active",
      });
    }
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  // Bulk operations
  const handleBulkDelete = () => {
    if (
      selectedStudents.length > 0 &&
      window.confirm(`Delete ${selectedStudents.length} selected students?`)
    ) {
      setStudents(
        students.filter((student) => !selectedStudents.includes(student.id))
      );
      setSelectedStudents([]);
    }
  };

  // Export data as CSV
  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Registration No",
      "Department",
      "Year",
      "Marks",
      "Email",
      "Phone",
      "Attendance",
      "Status",
    ];
    const csvData = [
      headers.join(","),
      ...filteredStudents.map((student) =>
        [
          student.name,
          student.regNo,
          student.dept,
          student.year,
          student.marks,
          student.email,
          student.phone,
          student.attendance,
          student.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "students_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Generate report
  const handleGenerateReport = () => {
    const report = `
STUDENT MANAGEMENT REPORT
Generated: ${new Date().toLocaleDateString()}

OVERVIEW:
- Total Students: ${analytics.totalStudents}
- Active Students: ${analytics.activeStudents}
- Average Marks: ${analytics.avgMarks}%
- Average Attendance: ${analytics.avgAttendance}%

PERFORMANCE ANALYSIS:
- Top Performers (90%+): ${analytics.topPerformers}
- Low Performers (<60%): ${analytics.lowPerformers}
- Low Attendance (<80%): ${analytics.lowAttendance}

DEPARTMENT BREAKDOWN:
${departments
  .map((dept) => {
    const deptStudents = students.filter((s) => s.dept === dept);
    return `- ${dept}: ${deptStudents.length} students`;
  })
  .join("\n")}
    `;

    const blob = new Blob([report], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "student_report.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      regNo: "",
      dept: "",
      year: "",
      marks: "",
      email: "",
      phone: "",
      address: "",
      parentName: "",
      parentPhone: "",
      attendance: "",
      status: "active",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header students={students} notifications={notifications} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <>
            <StatsCards analytics={analytics} />

            <ControlsSection
              viewMode={viewMode}
              setViewMode={setViewMode}
              handleExportCSV={handleExportCSV}
              handleGenerateReport={handleGenerateReport}
              setShowAddForm={setShowAddForm}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterDept={filterDept}
              setFilterDept={setFilterDept}
              filterYear={filterYear}
              setFilterYear={setFilterYear}
              selectedStudents={selectedStudents}
              handleBulkDelete={handleBulkDelete}
            />

            {(showAddForm || editingStudent !== null) && (
              <StudentForm
                showAddForm={showAddForm}
                editingStudent={editingStudent}
                formData={formData}
                handleInputChange={handleInputChange}
                handleAddStudent={handleAddStudent}
                handleUpdateStudent={handleUpdateStudent}
                handleCancelEdit={handleCancelEdit}
              />
            )}

            {viewMode === "table" ? (
              <StudentsTable
                filteredStudents={filteredStudents}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                handleEditStudent={handleEditStudent}
                handleDeleteStudent={handleDeleteStudent}
              />
            ) : (
              <StudentsCardView
                filteredStudents={filteredStudents}
                handleEditStudent={handleEditStudent}
                handleDeleteStudent={handleDeleteStudent}
              />
            )}
          </>
        )}

        {activeTab === "analytics" && (
          <AnalyticsTab analytics={analytics} students={students} />
        )}

        {activeTab === "notifications" && (
          <NotificationsTab
            notifications={notifications}
            setNotifications={setNotifications}
            analytics={analytics}
          />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Student Management Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default StudentManagementDashboard;
