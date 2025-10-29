import { useState } from "react";
import StepIndicator from "./components/StepIndicator";
import StepOne from "./components/StepOne";

export default function App() {
  const steps = ["Property Information", "File Requirement", "Finished!"];
  // const currentStep = 1;
  const [currentStep, setCurrentStep] = useState(1)
  console.log(currentStep)

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-card overflow-hidden w-full max-w-5xl">
        {/* LEFT SIDEBAR */}
        <div className="md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex justify-center border-b border-gray-200 p-6">
            <img
              src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/900261/logo-4ff4faad-7601-41a7-bebf-b73d2adc4b27.png"
              alt="Hotel Link Logo"
              width={200}
              // className="h-8 mb-8"
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
          <StepOne />
          <button onClick={() => setCurrentStep(currentStep + 1)} className="mt-6 w-full bg-primary text-white font-medium py-2.5 rounded-lg bg-blue-700 hover:bg-blue-900 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
