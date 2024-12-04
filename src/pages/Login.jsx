import React from "react";
import Bg from "../assets/auth.jpg";
import { Link } from "react-router-dom";
import { UseAppContext } from "../service/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { User, setUser } = UseAppContext();
  const HandleLogin = () => {
    setUser(true);
    if (!User) {
      toast.error("Please login in");
      return;
    }
    toast.success("Login Successful");
    navigate("/student/questions");
  };

  return (
    <div class="bg-white flex justify-center items-center h-[100vh] overflow-hidden border p-4">
      <div class="w-1/2 h-screen hidden lg:block py-4">
        <img
          src={Bg}
          alt="photos"
          class="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <div>
          <h1 class="text-2xl font-semibold mb-4">Welcome back </h1>
          <p className="text-base font-medium text-black">
            A brand new day is here. it's a day to shape.
          </p>
          <p className="text-base font-medium text-black">
            Get started with giving your heart warming feedbacks.
          </p>
        </div>

        <form action="#" method="POST" className="grid gap-3">
          <div class="">
            <label for="email" class="block text-gray-950 font-semibold my-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
              autocomplete="off"
            />
          </div>
          <div class="">
            <label
              for="password"
              class="block text-gray-950 font-semibold my-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
              autocomplete="off"
            />
          </div>
          <div class="mb-4 flex items-center justify-end">
            <Link to="/confirm/email" class="underline hover:text-blue-700">
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            onClick={HandleLogin}
            class="bg-blue-800 hover:bg-blue-600 text-white text-lh font-semibold rounded-xl p-4 w-full"
          >
            Login
          </button>
        </form>
        <div class="mt-6 text-start">
          Dont't you have an account
          <Link to="/register" class="hover:underline text-blue-700 ml-1">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
