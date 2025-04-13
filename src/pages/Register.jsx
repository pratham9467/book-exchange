import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      mobile: mobileRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    try {
      await axios.post("https://book-exchange-red.vercel.app/api/register", formData);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden relative">
      <img
        className="h-auto w-full hidden sm:hidden md:block lg:block xl:block absolute top-0 object-cover"
        src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="boy reading a book"
      />
      <div className="p-2 sm:p-2 md:p-4 lg:p-6 xl:p-6 max-w-md mx-auto lg:absolute xl:absolute right-20 border shadow-xl shadow-orange-300 shadow-2xl rounded-xl z-10 bg-white/30 backdrop-blur-sm">
        <h2 className="text-5xl font-bold mb-4">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 [&>input]:focus:outline-none [&>input]:focus:ring-2 [&>input]:focus:ring-[#d7b697] [&>input]:bg-transparent">
          <input ref={nameRef} type="text" name="name" placeholder="Name" className="w-full p-2 border rounded-3xl" />
          <input
            ref={mobileRef}
            type="text"
            name="mobile"
            placeholder="Mobile"
            className="w-full p-2 border rounded-3xl"
          />
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
          <select ref={roleRef} name="role" className="w-full p-2 border rounded-3xl">
            <option value="owner">Book Owner</option>
            <option value="seeker">Book Seeker</option>
          </select>
          <button type="submit" className="bg-orange-600 text-black font-semibold px-8 py-2 rounded-3xl">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
