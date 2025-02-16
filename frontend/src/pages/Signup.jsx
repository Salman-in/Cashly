import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backend_url = import.meta.env.VITE_BACKEND_URL.trim().replace(/\/$/, "");
 

console.log("Backend URL:", backend_url);
console.log(`${backend_url}/api/v1/user/signup`);


export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-t from-gray-200 via-slate-400 to-gray-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={e => setFirstName(e.target.value)} placeholder="Salman" label={"First Name"} />
          <InputBox onChange={e => setLastName(e.target.value)} placeholder="Najah" label={"Last Name"} />
          <InputBox onChange={e => setUsername(e.target.value)} placeholder="user_cashly" label={"Username"} />
          <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456789" label={"Password"} />
          <div className="pt-8">
            <Button
              onPress={async () => {
                try {
                  const response = await axios.post(`${backend_url}/api/v1/user/signup`, {
                    username,
                    firstname,
                    lastname,
                    password,
                  },{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Error signing up:", error);
                }
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
