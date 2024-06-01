"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex flex-col relative ">
        <h1 className="text-5xl font-bold text-center mb-0 mt-10 ">
        Environment Analyzer: Surrounding Assessment Tool
        </h1>
        <img src="/img/img3.jpg" alt="" className="object-cover -z-10 h-full w-full absolute opacity-40" />
      <div className="flex flex-col items-center justify-center h-3/4 py-2 border-4 w-2/3 rounded-2xl mt-4 mr-auto ml-auto  ">
        <h1 className="text-4xl mb-10 font-bold">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr />
        {/* <label htmlFor="username">username</label> */}
        <input
          className="p-2 m-4 w-2/5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        {/* <label htmlFor="email">email</label> */}
        <input
          className="p-2 m-4 w-2/5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        {/* <label htmlFor="password">password</label> */}
        <input
          className="p-2 m-4 w-2/5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onSignup}
          className="p-2 hover:bg-white hover:text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
        <Link href="/login">Visit login page</Link>
      </div>
    </div>
  );
}
