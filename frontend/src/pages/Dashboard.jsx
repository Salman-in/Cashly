import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"


export const Dashboard = () => {
    
    const [amount, setAmount] = useState(0);

    const getBalance = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAmount(parseFloat(data.balance).toFixed(2)); 
            } else {
                console.error("Error fetching balance");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getBalance();
    }, []); 

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={amount} />
            <Users />
        </div>
    </div>
}