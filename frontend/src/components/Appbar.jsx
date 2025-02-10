import { FaUserCircle } from 'react-icons/fa'; 

export const Appbar = () => {
    return (
        <div className="shadow-md h-16 flex justify-between items-center px-6 sm:px-8 bg-white">
            <div className="font-bold text-2xl text-slate-700 tracking-wide">
                Cashly
            </div>

            <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-600">
                    Hello, "username"
                </div>

                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex justify-center items-center shadow-md hover:bg-slate-300 cursor-pointer transition-all duration-200">
                        <FaUserCircle className="text-slate-700 text-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
