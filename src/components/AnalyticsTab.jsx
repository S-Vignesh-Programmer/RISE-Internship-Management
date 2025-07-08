import React from "react";
import { Award, AlertCircle, Calendar, BookOpen } from "lucide-react";
import { departments } from "../data/studentData";

const AnalyticsTab = ({ students, analytics }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Top Performers
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {analytics.topPerformers}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">
              Students with 90%+ marks
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">
                  Low Performers
                </p>
                <p className="text-2xl font-bold text-red-700">
                  {analytics.lowPerformers}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-2">
              Students with &lt;60% marks
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">
                  Low Attendance
                </p>
                <p className="text-2xl font-bold text-yellow-700">
                  {analytics.lowAttendance}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">
              Students with &lt;80% attendance
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Departments</p>
                <p className="text-2xl font-bold text-blue-700">
                  {new Set(students.map((s) => s.dept)).size}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-600 mt-2">Active departments</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Department-wise Breakdown
        </h3>
        <div className="space-y-4">
          {departments.map((dept) => {
            const deptStudents = students.filter((s) => s.dept === dept);
            const avgMarks =
              deptStudents.length > 0
                ? Math.round(
                    deptStudents.reduce(
                      (acc, s) => acc + parseInt(s.marks),
                      0
                    ) / deptStudents.length
                  )
                : 0;
            return (
              <div
                key={dept}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{dept}</h4>
                  <p className="text-sm text-gray-600">
                    {deptStudents.length} students
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {avgMarks}%
                  </p>
                  <p className="text-sm text-gray-600">Avg. marks</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
