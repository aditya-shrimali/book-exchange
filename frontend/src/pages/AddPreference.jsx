import { useState } from "react";
import { editPreferences } from "../api";

const AddPreference = () => {
  const [preference, setPreference] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPreference = preference.trim();
      if (newPreference) {
        const currentPreferences = JSON.parse(
          localStorage.getItem("userPreference") || "[]"
        );
        const updatedPreferences = [...currentPreferences, newPreference];

        await editPreferences(updatedPreferences);
        localStorage.setItem(
          "userPreference",
          JSON.stringify(updatedPreferences)
        );

        setPreference(""); // Clear input after successful submission
        alert("Preference added successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add preference. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add New Preference</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="preference"
            className="block text-sm font-medium text-gray-700"
          >
            New Preference:
          </label>
          <input
            type="text"
            id="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            placeholder="Enter a new preference"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Preference
        </button>
      </form>
    </div>
  );
};

export default AddPreference;
