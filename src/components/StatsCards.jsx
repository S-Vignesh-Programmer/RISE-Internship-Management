import React from "react";
import { Users, Target, Award, Calendar } from "lucide-react";

const StatsCards = ({ analytics }) => {
  const stats = [
    {
      title: "Total Students",
      value: analytics.totalStudents,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active",
      value: analytics.activeStudents,
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "Avg. Marks",
      value: `${analytics.avgMarks}%`,
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Avg. Attendance",
      value: `${analytics.avgAttendance}%`,
      icon: Calendar,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl/10
           hover:scale-110 transition-all duration-400"
        >
          <div className="flex items-center hover:scale-110 transition-all duration-300">
            <stat.icon className={`h-6 sm:h-8 w-6 sm:w-8 ${stat.color}`} />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                {stat.title}
              </p>
              <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
