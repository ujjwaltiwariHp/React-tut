import React, { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";

const ConnectivityStatus = ({ variant = "badge" }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (variant === "badge") {
    return (
      <div>
        {isOffline ? (
          <div className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <WifiOff className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Offline</span>
          </div>
        ) : (
          <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <Wifi className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Online</span>
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-[3px] rounded-2xl bg-gradient-to-r from-[#ff3c57] to-[#ff7861]">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
          <div className="flex flex-col items-center">
            {isOffline ? (
              <>
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-3 shadow-sm">
                  <WifiOff className="w-7 h-7 text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  You are Offline
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Please disconnect internet before starting the exam.
                  Data is cached and safe for offline use.
                </p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 shadow-sm">
                  <Wifi className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  You are Online
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Turn off internet to continue with offline exam mode.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectivityStatus;
