import { useState } from "react";
import StepIndicator from "./components/StepIndicator";
import StepOne from "./components/StepOne";
import PropertyImagesForm from "./components/stepTwo";
import FinishStep from "./components/StepThree";
import FinalThankYou from "./components/EndStep";

export default function App() {
  const steps = ["Property Information", "File Requirement", "Finished!"];
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false); // 🔹 state untuk animasi loading

  const [formData, setFormData] = useState({
    stepOne: {
      propertyName: "",
      numberOfRooms: "",
      reservationEmail: "",
      financeEmail: "",
      file: null,
    },
    stepTwo: {
      roomImages: [],
      logoImages: [],
    },
    stepThree: {},
  });

  // 🔹 Fungsi handleSubmit untuk kirim ke API
  const handleSubmit = async () => {
    try {
      setLoading(true); // mulai loading

      // Helper: convert File ke Base64
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      // Step 1: convert file jika ada
      const stepOneFileBase64 = formData.stepOne.file
        ? await toBase64(formData.stepOne.file)
        : null;

      // Step 2: convert images
      const roomImagesBase64 = await Promise.all(
        formData.stepTwo.roomImages.map(toBase64)
      );
      const logoImagesBase64 = await Promise.all(
        formData.stepTwo.logoImages.map(toBase64)
      );

      // Siapkan payload JSON
      const payload = {
        stepOne: { ...formData.stepOne, file: stepOneFileBase64 },
        stepTwo: {
          roomImages: roomImagesBase64,
          logoImages: logoImagesBase64,
        },
        stepThree: { ...formData.stepThree },
      };

      console.log("Payload ready:", payload);

      // Kirim ke Apps Script
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwAOQ76AsbZWC2QVeaLJMXobtRt8FxnuIUlEiZ0dy4V45j47Jx3fAgc4-7zbQt62IVi2w/exec",
        {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        console.log("Response:", data);
        setCurrentStep(4); // tampilkan halaman FinalThankYou
      } else {
        alert("Failed to submit form: " + (data.message || ""));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong while submitting form.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // 🔹 Fungsi untuk validasi step 1 & 2
  const validateStep = (step) => {
    if (step === 1) {
      const {
        propertyName,
        numberOfRooms,
        reservationEmail,
        financeEmail,
        file,
      } = formData.stepOne || {};

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errors = [];

      // Property name
      if (!propertyName || !propertyName.toString().trim()) {
        errors.push("Property Name is required.");
      }

      // Number of rooms: must be a positive integer
      const rooms = Number(numberOfRooms);
      if (
        !numberOfRooms ||
        isNaN(rooms) ||
        !Number.isFinite(rooms) ||
        rooms <= 0
      ) {
        errors.push(
          "Number of Rooms is required and must be a positive number."
        );
      }

      // Reservation email
      if (!reservationEmail || !reservationEmail.toString().trim()) {
        errors.push("Reservation Email is required.");
      } else if (!emailRegex.test(reservationEmail.toString().trim())) {
        errors.push("Reservation Email is not a valid email address.");
      }

      // Finance email
      if (!financeEmail || !financeEmail.toString().trim()) {
        errors.push("Finance Email is required.");
      } else if (!emailRegex.test(financeEmail.toString().trim())) {
        errors.push("Finance Email is not a valid email address.");
      }

      // File: must exist and be a PDF
      if (!file) {
        errors.push("Contract file (PDF) is required.");
      } else {
        const isPdf =
          (file.type && file.type === "application/pdf") ||
          (file.name && file.name.toLowerCase().endsWith(".pdf"));
        if (!isPdf) {
          errors.push("Contract file must be a PDF.");
        }
      }

      if (errors.length > 0) {
        // Tampilkan semua error sekaligus agar user tahu apa yang harus diperbaiki
        alert(
          "Please fix the following errors:\n\n" +
            errors.map((e) => `- ${e}`).join("\n")
        );
        return false;
      }
    }

    if (step === 2) {
      const { roomImages = [], logoImages = [] } = formData.stepTwo || {};
      const errors = [];

      // Allowed image mime types
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];

      // Check room images
      if (roomImages.length === 0) {
        errors.push("Please upload at least one Room Image.");
      } else {
        const invalidRooms = roomImages.filter(
          (file) => !allowedTypes.includes(file.type)
        );
        if (invalidRooms.length > 0) {
          errors.push(
            "Room Images must be in image format (jpg, png, webp, gif)."
          );
        }
      }

      // Check logo images
      if (logoImages.length === 0) {
        errors.push("Please upload at least one Logo Image.");
      } else {
        const invalidLogos = logoImages.filter(
          (file) => !allowedTypes.includes(file.type)
        );
        if (invalidLogos.length > 0) {
          errors.push(
            "Logo Images must be in image format (jpg, png, webp, gif)."
          );
        }
      }

      if (errors.length > 0) {
        alert(
          "Please fix the following:\n\n" +
            errors.map((e) => `- ${e}`).join("\n")
        );
        return false;
      }
    }

    return true;
  };

  return (
    <>
      {currentStep > 3 ? (
        <FinalThankYou />
      ) : (
        <div className="flex justify-center items-center min-h-screen p-4">
          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-card overflow-hidden w-full max-w-5xl relative">
            {/* Overlay Loading */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-sm font-medium text-blue-700">
                  Submitting your form...
                </p>
              </div>
            )}

            {/* LEFT SIDEBAR */}
            <div className="md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
              <div className="flex justify-center border-b border-gray-200 p-6">
                <img
                  src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/900261/logo-4ff4faad-7601-41a7-bebf-b73d2adc4b27.png"
                  alt="Hotel Link Logo"
                  width={200}
                />
              </div>
              <div className="p-6">
                <h2 className="text-md font-semibold mb-6 text-gray-800">
                  Registration Form for New Property
                </h2>
                <StepIndicator steps={steps} currentStep={currentStep} />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:w-2/3 bg-blue-50 p-8">
              {currentStep === 1 ? (
                <StepOne
                  data={formData.stepOne}
                  onUpdate={(updatedData) =>
                    setFormData((prev) => ({
                      ...prev,
                      stepOne: { ...prev.stepOne, ...updatedData },
                    }))
                  }
                />
              ) : currentStep === 2 ? (
                <PropertyImagesForm
                  data={formData.stepTwo}
                  onUpdate={(updatedData) =>
                    setFormData((prev) => ({
                      ...prev,
                      stepTwo: { ...prev.stepTwo, ...updatedData },
                    }))
                  }
                />
              ) : (
                <FinishStep />
              )}

              {/* 🔹 Tombol Next / Submit */}
              <button
                disabled={loading}
                onClick={() => {
                  if (currentStep === 3) {
                    handleSubmit();
                  } else {
                    // Cek validasi sebelum lanjut step berikutnya
                    if (validateStep(currentStep)) {
                      setCurrentStep(currentStep + 1);
                    }
                  }
                }}
                className={`mt-6 w-full font-medium py-2.5 rounded-lg transition ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-700 text-white hover:bg-blue-900"
                }`}
              >
                {loading
                  ? "Please wait..."
                  : currentStep === 3
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
