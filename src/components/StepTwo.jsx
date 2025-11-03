import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function PropertyImagesForm({ data, onUpdate }) {
  const handleUpload = (e, type) => {
    const files = Array.from(e.target.files);

    // Simpan file asli (bukan cuma preview)
    const updatedFiles = type === "room"
      ? [...(data.roomImages || []), ...files]
      : [...(data.logoImages || []), ...files];

    onUpdate({
      [type === "room" ? "roomImages" : "logoImages"]: updatedFiles,
    });
  };

  // Untuk preview
  const roomPreviews = (data.roomImages || []).map((file) =>
    typeof file === "string" ? file : URL.createObjectURL(file)
  );
  const logoPreviews = (data.logoImages || []).map((file) =>
    typeof file === "string" ? file : URL.createObjectURL(file)
  );

  return (
    <div className="flex-1 rounded-r-2xl">
      <h3 className="text-lg mb-3 my-3 font-semibold text-gray-800">
        File Requirement
      </h3>

      {/* Room Images */}
      <label className="block mb-3 text-xs font-medium text-gray-700">
        Room Images <span className="text-red-500">*</span>
      </label>
      <div
        className="flex items-center w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-xs"
      >
        <ArrowUpTrayIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleUpload(e, "room")}
          className="w-full text-xs text-gray-500 bg-transparent border-none focus:outline-none file:hidden"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
        {roomPreviews.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`room-${i}`}
            className="w-full aspect-[6/3] object-cover rounded-lg border"
          />
        ))}
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Logo Images */}
      <label className="block mb-3 text-xs font-medium text-gray-700">
        Property Logo <span className="text-red-500">*</span>
      </label>
      <div
        className="flex items-center w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-xs"
      >
        <ArrowUpTrayIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleUpload(e, "logo")}
          className="w-full text-xs text-gray-500 bg-transparent border-none focus:outline-none file:hidden"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
        {logoPreviews.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`logo-${i}`}
            className="w-full aspect-[6/3] object-cover rounded-lg border"
          />
        ))}
      </div>
    </div>
  );
}
