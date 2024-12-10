import { useState } from 'react';

const SpinnerTest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('İşlem tamamlandı!');
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`py-4 px-6 text-white rounded-md ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        ) : (
          "Click Me"
        )}
      </button>
    </div>
  );
};

export default SpinnerTest;