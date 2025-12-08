"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

const LogoIcon = () => (
  <svg
    className="w-10 h-10"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="24" height="24" rx="6" fill="#00CC66" />
    <path
      d="M12 4L4 9V20H20V9L12 4ZM12 6.5L18 10.25V18H6V10.25L12 6.5ZM14.5 13H17V17H14.5V13ZM7 13H9.5V17H7V13ZM10.25 13H13.75V17H10.25V13Z"
      fill="white"
    />
  </svg>
);
const NotFoundPage = () => {
  const primaryGreen = "#00CC66";
  const lightBackground = "#f4faff";
  const router = useRouter();
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: lightBackground }}>
      <div className="flex flex-col items-center mb-12">
        <LogoIcon />
        <h1 className="text-2xl font-semibold text-gray-800 mt-2">RentChain</h1>
        <p className="text-sm text-gray-500">Blockchain Platform</p>
      </div>

      <div className="text-center max-w-lg mx-auto">
        <div className="flex items-center justify-center space-x-6 mb-6 relative">
          <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 text-5xl">
            🔍
          </div>

          <div className="relative z-10">
            <h2 className="text-8xl font-extrabold text-gray-800 mb-2">404</h2>
            <h3 className="text-2xl font-medium text-gray-700">
              Page Not Found
            </h3>
          </div>

          <div className="absolute right-0 translate-x-1/2 -top-4 text-5xl">
            🚫
          </div>
        </div>

        <div className="relative mt-8">
          <p className="text-gray-500 mb-8 max-w-xs mx-auto text-lg leading-relaxed">
            <span className="inline-block mx-2 text-2xl">😩</span>
            Oops! The page you`re looking for doesn`t exist or has moved.
            <span className="inline-block mx-2 text-2xl">😔</span>
          </p>

          <span className="absolute -left-10 top-4 text-3xl hidden sm:block">
            💨
          </span>
          <span className="absolute -right-10 top-0 text-3xl hidden sm:block">
            ⚠️
          </span>
        </div>

        <Button
          className=" px-10 py-3 text-white font-semibold rounded-full shadow-lg transition-all transform hover:scale-105"
          style={{
            backgroundColor: primaryGreen,
            boxShadow: `0 4px 15px rgba(0, 204, 102, 0.5)`,
          }}
          onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
