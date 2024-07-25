"use client";
import React, { useState, useEffect } from "react";
import LoadingModal from "./components/LoadingModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingModal />
      ) : (
        <div>
          {/* Your main content */}
          <h1 className="text-4xl text-center mt-20">
            Welcome to HealthConnect
          </h1>
        </div>
      )}
    </div>
  );
}
