import React from "react";
import { Bell, GraduationCap } from "lucide-react";

const Header = ({ students, notifications }) => {
  return (
    <div className="bg-white shadow-2xl/20 border-b-current sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="">
              <h1 className="text-[18px] sm:text-[12px] xl:text-2xl font-semibold text-gray-900">
                Student Management
              </h1>
              <p className="hidden sm:block  text-sm text-gray-500">
                Institute Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {notifications.length > 0 && (
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </div>
            )}
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-blue-600">
                {students.length} Student
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
