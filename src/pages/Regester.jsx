import React from "react";
import { Link } from "react-router-dom";
import Bg from "../assets/auth.jpg";

const Regester = () => {
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
        <div className="mb-5">
          <h1 class="text-2xl font-semibold mb-4">Create Account</h1>
          <p className="text-base font-medium text-black">
            A few simple steps to join the StudentVoice community
          </p>
        </div>

        <form action="#" method="POST" className="grid gap-3">
          <div class="">
            <label
              for="fullname"
              class="block text-gray-950 font-semibold my-2"
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
              autocomplete="off"
            />
          </div>
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
          <button
            type="button"
            class="bg-blue-800 hover:bg-blue-600 text-white text-lh font-semibold rounded-xl p-4 w-full mt-5"
          >
            Register
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <div class="text-start">
            Have an account
            <Link to="/register" class="hover:underline text-blue-700 ml-1">
              Login
            </Link>
          </div>
          <Link to="/Register/institution" className="text-blue-700 hover:font-semibold">
            Regiser your institution
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Regester;
