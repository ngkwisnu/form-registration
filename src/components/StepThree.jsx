import { CheckCircle2 } from "lucide-react";

export default function FinishStep() {
  return (
    <div className="flex-1 bg-gray-50 rounded-r-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center">
        <CheckCircle2 className="w-16 h-16 text-blue-700 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 max-w-md">
          Thank you for signing up! You’ll receive a confirmation email shortly
          with the next steps.
        </p>
      </div>
    </div>
  );
}
