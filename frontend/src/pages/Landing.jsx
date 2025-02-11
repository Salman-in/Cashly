import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-t from-gray-100 via-blue-200 to-gray-100 font-poppins min-h-screen pt-4">
            <Navbar />
            <div className="flex flex-col items-center text-center px-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950 mt-12 pb-2 transition-transform duration-300 ease-in-out hover:scale-105">
                    Welcome to <span className="text-blue-900">Cashly!</span>
                </h1>
                <p className="text-gray-400 text-sm sm:text-md">Simplifying money, one transaction at a time.</p>
            </div>

            <div className="flex justify-center p-8 flex-col w-full max-w-sm sm:max-w-md mx-auto">
                <button
                    onClick={() => navigate("/signup")}
                    className="text-white bg-blue-950 hover:bg-blue-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg sm:text-xl px-4 sm:px-6 py-2 sm:py-3 transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    Get Started!
                </button>
            </div>
        </div>
    );
};
