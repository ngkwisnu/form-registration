// import { CheckCircleIcon } from "@heroicons/react/24/solid";

// export default function StepIndicator({ steps, currentStep }) {
//   return (
//     <div className="relative flex flex-col mt-8">
//       {steps.map((step, i) => (
//         <div key={i} className="relative flex items-center gap-3 mb-8 last:mb-0">
//           {/* Garis vertikal */}
//           {i < steps.length - 1 && (
//             <div className="absolute left-[11px] top-7 w-[2px] h-[24px] bg-gray-300"></div>
//           )}

//           {/* Lingkaran step */}
//           {i + 1 < currentStep ? (
//             <div className="relative z-10">
//               <CheckCircleIcon className="h-6 w-6 text-blue-600" />
//             </div>
//           ) : (
//             <div
//               className={`relative z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center text-sm ${
//                 i + 1 === currentStep
//                   ? "border-blue-600 text-blue-600 font-bold"
//                   : "border-gray-300 text-gray-400"
//               }`}
//             >
//               {i + 1}
//             </div>
//           )}

//           {/* Label step */}
//           <p
//             className={`text-sm font-medium ${
//               i + 1 === currentStep
//                 ? "text-blue-600"
//                 : i + 1 < currentStep
//                 ? "text-gray-800"
//                 : "text-gray-400"
//             }`}
//           >
//             {step}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="relative flex flex-col mt-8">
      {steps.map((step, i) => (
        <div
          key={i}
          className="relative flex items-center gap-3 mb-8 last:mb-0"
        >
          {/* Garis vertikal antar step */}
          {i < steps.length - 1 && (
            <div
              className={`absolute left-[11px] top-6 w-[2px] h-[32px] ${
                i + 1 < currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
          )}

          {/* Ikon / Lingkaran Step */}
          {i + 1 < currentStep ? (
            <div className="relative z-10">
              <CheckCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
          ) : (
            <div
              className={`relative z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${
                i + 1 === currentStep
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {i + 1}
            </div>
          )}

          {/* Label Step */}
          <p
            className={`text-sm font-medium ${
              i + 1 === currentStep
                ? "text-blue-600"
                : i + 1 < currentStep
                ? "text-gray-800"
                : "text-gray-400"
            }`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}
