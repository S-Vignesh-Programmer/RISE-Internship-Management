import React from "react";
import { AlertCircle, Bell, X } from "lucide-react";

const NotificationsTab = ({ notifications, setNotifications, analytics }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Alert System
        </h3>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border-l-4 ${
                notification.type === "warning"
                  ? "bg-yellow-50 border-yellow-400"
                  : "bg-blue-50 border-blue-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle
                    className={`h-5 w-5 ${
                      notification.type === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNotifications(
                      notifications.filter((n) => n.id !== notification.id)
                    )
                  }
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No alerts at the moment</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          System Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800">Good Performance</h4>
            <p className="text-sm text-green-600 mt-1">
              {analytics.topPerformers} students are performing excellently
              (90%+ marks)
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-800">Needs Attention</h4>
            <p className="text-sm text-red-600 mt-1">
              {analytics.lowPerformers} students need academic support (&lt;60%
              marks)
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800">Attendance Issues</h4>
            <p className="text-sm text-yellow-600 mt-1">
              {analytics.lowAttendance} students have attendance below 80%
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800">Overall Health</h4>
            <p className="text-sm text-blue-600 mt-1">
              {Math.round(
                (analytics.activeStudents / analytics.totalStudents) * 100
              )}
              % of students are active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
