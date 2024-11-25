import React from "react";
import { Link } from "react-router-dom";
import Bg from "../assets/auth.jpg";
import State from "../components/State";

const RegSch = () => {
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedLGA, setSelectedLGA] = React.useState("");

  const selectedStateData = State.find(
    (stateData) => stateData.state === selectedState
  );
  const lgas = selectedStateData ? selectedStateData.lgas : [];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedLGA("");
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
      <div class="lg:px-36 lg:py-10 md:p-20 p-8 w-full lg:w-1/2 border border-red-600 overflow-y-auto max-h-[90vh]">
        <div className="mb-5">
          <h1 class="text-2xl font-semibold mb-4">Create Account</h1>
          <p className="text-base font-medium text-black">
            A quick and easy way to bring your school onboard the StudentVoice
            platform.
          </p>
        </div>

        <form action="#" method="POST" className="grid gap-2">
          <div class="">
            <label
              for="fullname"
              class="block text-gray-950 font-semibold my-2"
            >
              Institution Name
            </label>
            <input
              type="text"
              id="iname"
              name="iname"
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
              for="countries"
              class="block text-gray-950 font-semibold my-2"
            >
              Institution Type
            </label>
            <select
              id="countries"
              class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
            >
              <option selected>Select type</option>
              <option value="US">School</option>
              <option value="CA">College</option>
              <option value="FR">University</option>
            </select>
          </div>

          <div class="">
            <label
              for="password"
              class="block text-gray-950 font-semibold my-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
              autocomplete="off"
              value="Nigeria"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="state"
              class="block text-gray-950 font-semibold my-2"
            >
              State
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={handleStateChange}
              class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
            >
              <option value="">Select State</option>
              {State.map((stateData) => (
                <option key={stateData.state} value={stateData.state}>
                  {stateData.state}
                </option>
              ))}
            </select>
          </div>

          {/* LGA Input */}
          <div>
            <label htmlFor="lga" class="block text-gray-950 font-semibold my-2">
              LGA
            </label>
            <select
              id="lga"
              value={selectedLGA}
              onChange={(e) => setSelectedLGA(e.target.value)}
              class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
            >
              <option value="">Select LGA</option>
              {lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
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
        </div>
      </div>
    </div>
  );
};

export default RegSch;
