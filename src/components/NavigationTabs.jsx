import React from "react";
import { Users, TrendingUp, Bell } from "lucide-react";

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "notifications", label: "Alerts", icon: Bell },
  ];

  return (
    <div className="mb-6">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-3 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;
