import InputField from "./InputField";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function StepOne({ data, onUpdate }) {
  
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Property Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="Property Name"
          placeholder="Enter property name"
          value={data.propertyName}
          onChange={(e) => handleChange("propertyName", e.target.value)}
        />
        <InputField
          label="Number of Rooms"
          type="number"
          placeholder="0"
          value={data.numberOfRooms}
          onChange={(e) => handleChange("numberOfRooms", e.target.value)}
        />
      </div>

      <div className="mt-4">
        <InputField
          label="Property Description"
          type="textarea"
          placeholder="Write short description here..."
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <hr className="my-6 border-gray-300" />

      <h3 className="text-lg mb-3 my-3 font-semibold text-gray-800">
        Contract Assignment
      </h3>
      <label className="block mb-3 text-xs font-medium text-gray-700">
        Upload file <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-xs">
        <ArrowUpTrayIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
        <input
          type="file"
          onChange={(e) => handleChange("file", e.target.files[0])}
          className="w-full text-xs text-gray-500 bg-transparent border-none focus:outline-none file:hidden"
        />
      </div>
      <p className="text-xs italic text-gray-500 mt-1">
        * Please upload pdf file
      </p>
    </>
  );
}
