export default function FinalThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/900261/logo-4ff4faad-7601-41a7-bebf-b73d2adc4b27.png"
          alt="HotelLink Logo"
          className="w-60 md:w-72"
        />
      </div>

      {/* Message */}
      <p className="text-gray-600 text-sm md:text-base max-w-md">
        Thank you for signing up! You’ll receive a confirmation email shortly
        with the next steps.
      </p>
    </div>
  );
}
