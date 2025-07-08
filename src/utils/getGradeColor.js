// utils/getGradeColor.js

export function getGradeColor(marks) {
  if (marks >= 90) return "bg-green-100 text-green-800";
  if (marks >= 75) return "bg-blue-100 text-blue-800";
  if (marks >= 60) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}


// utils/getAttendanceColor.js

export function getAttendanceColor(attendance) {
    if (attendance >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (attendance >= 75) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (attendance >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  }
  