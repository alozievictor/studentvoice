import React from "react";
import { UseAppContext } from "../service/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";


const Landingpage = () => {
  const navigate = useNavigate();
  const {User} = UseAppContext();

  const HandleStarted = () => {
    if(!User) {
      toast.error("Please login")
      navigate("/login");
      return
    }
     toast.success("You are logged in ")
  }

  return (
    <div className="w-full relative">
      <Navbar/>
      <div className="hero w-full flex justify-center items-center">
        <div className="w-full mx-auto py-10 grid gap-4">
          <h1 className="text-white font-bold text-6xl text-center">
            Empowering Voices, Transforming <span className="text-blue-500">Education</span>.
          </h1>
          <p className="text-gray-200 font-normal text-lg text-center w-[50%] mx-auto">
            StudentVoice is a platform designed to bridge the gap between
            students and educators by fostering open communication, promoting
            improvement, and enhancing learning experiences.
          </p>
          <button
            type="button"
            onClick={HandleStarted}
            className="text-blue-700 px-5 py-3.5 bg-white rounded-lg font-bold w-40 mx-auto cursor-auto mt-5 drop-shadow"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
