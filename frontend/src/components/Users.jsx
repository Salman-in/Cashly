import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const backend_url = import.meta.env.VITE_BACKEND_URL; 

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log(`API CALL ${filter}`);
            const response = await axios.get(`${backend_url}/api/v1/user/bulk?filter=${filter}`);
            setUsers(response.data.user || []);
        } catch (err) {
            setError("Failed to fetch users");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const timer = setTimeout(fetchUsers, 300);
    
        return () => {  
            clearTimeout(timer);
        }   
    }, [filter]);

    return (
        <div className="mt-6">
            <div className="font-bold text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded-md border-slate-200"
                />
            </div>

            {loading && <Loading />}
            {error && <p className="text-red-500">{error}</p>}

            <div>
                {users?.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};

const User = ({ user }) => {
    const navigate = useNavigate();

    return <>
        <div className="flex justify-between items-center p-2 border-b border-slate-200">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl font-bold mr-3">
                    {user.firstname?.[0] || "U"}
                </div>
                <div className="text-sm">
                    <div className="font-semibold">{user.firstname} {user.lastname}</div>
                </div>
            </div>

            <div className="flex flex-col justify-center">
            <Button onPress={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname);
            }} label={"Send Money"} />
        </div>
        </div>
</>

}