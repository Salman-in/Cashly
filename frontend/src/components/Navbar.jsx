import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="backdrop-blur-md bg-white/30 shadow-md h-16 flex justify-between items-center px-6 sm:px-8 max-w-xl mx-auto rounded-lg ">
            <div className="font-bold text-3xl text-blue-900 tracking-wide">
                Cashly
            </div>

            <div>
                <Button label={"Sign In"} onPress={() => {
                    navigate("/signin");
                }} />
            </div>
        </div>
    );
};
