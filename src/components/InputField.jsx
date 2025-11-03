export default function InputField({ label, type = "text", placeholder, ...props }) {
  return (
    <div>
      <label className="block mb-3 text-xs font-medium text-gray-700 dark:text-white">
        {label} <span className="text-red-500">*</span>
      </label>
      {type === "textarea" ? (
        <textarea
          className="block w-full p-2 text-gray-500 border border-gray-300 rounded-md bg-gray-50 
                     text-xs focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          {...props}
          rows={4}
        ></textarea>
      ) : (
        <input
          type={type}
          className="block w-full p-2 text-gray-500 border border-gray-300 rounded-md bg-gray-50 
                     text-xs focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
}
