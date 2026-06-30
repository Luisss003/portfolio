import { useState, useEffect } from "react";
import twin from "../assets/twin.jpg";
import { Navbar } from "../components/Navbar";
import AcademicHome from "./AcademicHome";

const INTRO_SEEN_KEY = "luis-saenz-intro-seen";

function shouldShowIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) !== "true";
  } catch {
    return true;
  }
}

export function HomePage() {
  const [isSplashing, setIsSplashing] = useState(shouldShowIntro);

  useEffect(() => {
    if (!isSplashing) {
      return;
    }

    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch {
      // Keep the intro functional even if browser storage is unavailable.
    }

    const timer = setTimeout(() => {
      setIsSplashing(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, [isSplashing]);

  return (
    <div className="relative h-full min-h-full bg-black overflow-x-hidden">
      <div 
        className={`absolute inset-0 z-50 flex items-center justify-center bg-black bg-center bg-no-repeat bg-contain transition-opacity duration-1000 ease-in-out pointer-events-none ${
          isSplashing ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${twin})` }}
      >
        <div className="flex flex-col items-center">
          <h1 className="font-avant text-[70px] font-bold text-[#644647] uppercase tracking-[1px] [text-shadow:1px_1px_0_#47ff52,-1px_-1px_0_#47ff52,1px_-1px_0_#47ff52,-1px_1px_0_#47ff52,0px_1px_0_#47ff52,1px_0px_0_#47ff52,0px_-1px_0_#47ff52,-1px_0px_0_#47ff52,4px_2px_0_#333]">
            Luis Saenz
          </h1>
          <p className="font-avant text-[35px] font-bold text-[#644647] uppercase tracking-[1px] [text-shadow:1px_1px_0_#47ff52,-1px_-1px_0_#47ff52,1px_-1px_0_#47ff52,-1px_1px_0_#47ff52,0px_1px_0_#47ff52,1px_0px_0_#47ff52,0px_-1px_0_#47ff52,-1px_0px_0_#47ff52,4px_2px_0_#333]">
            Systems Security Researcher
          </p>
        </div>
      </div>

      <div className={`h-full min-h-full transition-opacity duration-1000 delay-500 ${isSplashing ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <AcademicHome />
      </div>
    </div>
  );
}
