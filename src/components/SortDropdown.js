"use client";

export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-48 px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    >
      <option value="">Sort</option>
      <option value="low">Price: Low → High</option>
      <option value="high">Price: High → Low</option>
    </select>
  );
}
