import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'dotenv/config';

const backend_url = process.env.REACT_APP_BACKEND_URL;

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //I did it!!!!!!!!!
  const findUser = async (username, password) => {
    try {
      const res = await axios.post("backend_url/api/v1/user/signin", {
        username,
        password,
      });
  
      // Log the token directly from the response
      console.log("Token:", res.data.token);
      return res.data;

    } catch (error) {
      console.error("Signin failed:", error.response?.data || error.message);
      return null;
    }
  };
  

  const handleSignIn = async () => {
    const data = await findUser(username, password);
    console.log("Data:", data);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="bg-gradient-to-t from-gray-200 via-slate-400 to-gray-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox placeholder="email@cashly.com" label={"Email"} onChange={(e) => setUsername(e.target.value)} />
          <InputBox placeholder="123456789" label={"Password"} type="password" onChange={(e) => setPassword(e.target.value)} />
          <div className="pt-8">
            <Button label={"Sign in"} onPress={handleSignIn} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
