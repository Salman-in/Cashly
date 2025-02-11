import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
const backend_url = import.meta.env.VITE_BACKEND_URL; 

export const Dashboard = () => {

    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    // We cant use this logic here as the token is not fixed and it can be changed, so we need to get the user info from the backend using the /user/me endpoint(Do it).
    // const [firstname, setFirstname] = useState("");

    // const getFirstname = async () => {
    //     try {
    //         const response = await axios.get(`${backend_url}/api/v1/user/updateinfo`", {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("token")
    //             }
    //         })
    //         setFirstname(response.data.firstname);

    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }
    const getBalance = async () => {
        try {
            const response = await fetch(`${backend_url}/api/v1/account/balance`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            const data = await response.json();
            setAmount(parseFloat(data.balance).toFixed(2));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getBalance();
        // getFirstname();
    }, []);

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={amount} />
            <Users />
            <div className="mt-4 flex justify-end">
            <Button label={"Logout"} onPress={()=>{
                localStorage.removeItem("token");
                navigate("/signin");
            }} />
            </div>
        </div>
    </div>
}