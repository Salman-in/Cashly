import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const Transfer = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    // Fallback to a default name if 'name' is not available
    const displayName = name ? name : "User";

    return (
        <div className="flex justify-center h-screen bg-gradient-to-t from-gray-100 via-green-200 to-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-xl rounded-lg">
                    <div className="flex flex-col m-4 p-4 space-y-1.5">
                        <h2 className="text-4xl font-bold text-center text-green-900">Transfer Money</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 border border-green-200 p-4 rounded-lg bg-green-100">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{displayName[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{displayName}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-20 text-gray-500" htmlFor="amount">
                                    Amount (in Rupees)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-gray-00 border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={async () => {
                                    await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                        to: id,
                                        amount
                                    }, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    });
                                }}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
