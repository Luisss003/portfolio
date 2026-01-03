import twin from "../assets/twin.jpg";
import { Navbar } from "../components/Navbar";

export function HomePage() {
  return (
    <>
        <div className="h-screen w-full flex items-center justify-center bg-black bg-center bg-no-repeat bg-contain"style={{ backgroundImage: `url(${twin})` }}>
        <div className="animate-fadeIn flex flex-col items-center w-full">
            <Navbar/>
            <h1 className="font-avant text-[70px] font-bold text-[#644647] uppercase tracking-[1px]
            [text-shadow:1px_1px_0_#47ff52,-1px_-1px_0_#47ff52,1px_-1px_0_#47ff52,-1px_1px_0_#47ff52,0px_1px_0_#47ff52,1px_0px_0_#47ff52,0px_-1px_0_#47ff52,-1px_0px_0_#47ff52,4px_2px_0_#333]  ">Luis Saenz
            </h1>
            <p className="font-avant text-[35px] font-bold text-[#644647] uppercase tracking-[1px]
            [text-shadow:1px_1px_0_#47ff52,-1px_-1px_0_#47ff52,1px_-1px_0_#47ff52,-1px_1px_0_#47ff52,0px_1px_0_#47ff52,1px_0px_0_#47ff52,0px_-1px_0_#47ff52,-1px_0px_0_#47ff52,4px_2px_0_#333]  ">Software Engineer
            </p>

        </div>
    </div>
    </>
  );
}
