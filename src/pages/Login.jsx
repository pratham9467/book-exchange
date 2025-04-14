import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        "https://backend-book-exchange-production-160d.up.railway.app/api/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/seeker-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden relative">
      <img
        className="h-auto w-full hidden sm:hidden md:block lg:block xl:block absolute top-0 object-cover"
        src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="login background"
        loading="lazy"
      />
      <div className="p-2 sm:p-2 md:p-4 lg:p-6 xl:p-6 max-w-md mx-auto lg:absolute xl:absolute right-20 border shadow-xl shadow-orange-300 shadow-2xl rounded-xl z-10 bg-white/30 backdrop-blur-sm">
        <h2 className="text-5xl font-bold mb-4">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 [&>input]:focus:outline-none [&>input]:focus:ring-2 [&>input]:focus:ring-[#d7b697] [&>input]:bg-transparent">
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded-3xl"
          />
          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded-3xl"
          />
          <button type="submit" className="bg-orange-600 text-black font-semibold px-8 py-2 rounded-3xl">
            Login
          </button>
        </form>
        <h5 className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-orange-600 cursor-pointer hover:underline">
            Register here
          </span>
        </h5>
      </div>
    </div>
  );
}
