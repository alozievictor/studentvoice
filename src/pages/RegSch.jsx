import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from "../assets/auth.jpg";
import State from "../components/State";
import { toast } from "react-toastify";

const RegSch = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: "",
    email: "",
    website: "",
    phone: "",
    address: "",
    state: "",
    lga: "",
    adminPassword: ""
  });
  const [errors, setErrors] = useState({});

  const selectedStateData = State.find(
    (stateData) => stateData.state === selectedState
  );
  const lgas = selectedStateData ? selectedStateData.lgas : [];

  useEffect(() => {
    if (!localStorage.getItem('studentVoiceInstitutions')) {
      localStorage.setItem('studentVoiceInstitutions', JSON.stringify([]));
    }
  }, []);

  const handleStateChange = (e) => {
    const stateValue = e.target.value;
    setSelectedState(stateValue);
    setSelectedLGA("");
    setFormData(prev => ({ ...prev, state: stateValue, lga: "" }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLGAChange = (e) => {
    const lgaValue = e.target.value;
    setSelectedLGA(lgaValue);
    setFormData(prev => ({ ...prev, lga: lgaValue }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.institutionName) newErrors.institutionName = "Institution name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.lga) newErrors.lga = "LGA is required";
    if (!formData.adminPassword) newErrors.adminPassword = "Admin password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        // Get existing institutions
        const institutions = JSON.parse(localStorage.getItem('studentVoiceInstitutions') || '[]');
        
        // Check if institution already exists
        if (institutions.some(inst => inst.email === formData.email)) {
          setErrors(prev => ({ ...prev, email: "Institution with this email already exists" }));
          setIsSubmitting(false);
          return;
        }
        
        // Create new institution
        const newInstitution = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        
        // Add institution to array and save back to localStorage
        institutions.push(newInstitution);
        localStorage.setItem('studentVoiceInstitutions', JSON.stringify(institutions));
        
        // Create admin user for this institution
        const users = JSON.parse(localStorage.getItem('studentVoiceUsers') || '[]');
        const adminUser = {
          id: `admin-${Date.now()}`,
          name: `Admin - ${formData.institutionName}`,
          email: formData.email,
          password: formData.adminPassword,
          role: 'admin',
          institutionId: newInstitution.id
        };
        
        users.push(adminUser);
        localStorage.setItem('studentVoiceUsers', JSON.stringify(users));
        
        toast.success("Institution registered successfully! You can now login as admin");
        navigate('/login');
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500); // 1.5 second delay to show loading state
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
      <div class="lg:px-36 lg:py-10 md:p-20 p-8 w-full lg:w-1/2 overflow-y-auto max-h-[90vh]">
        <div className="mb-5">
          <h1 class="text-2xl font-semibold mb-4">Create Account</h1>
          <p className="text-base font-medium text-black">
            A quick and easy way to bring your school onboard the StudentVoice
            platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="">
            <label
              htmlFor="institutionName"
              className="block text-gray-950 font-semibold my-2"
            >
              Institution Name
            </label>
            <input
              type="text"
              id="institutionName"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              className={`w-full border ${errors.institutionName ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              autoComplete="off"
            />
            {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>}
          </div>
          <div className="">
            <label htmlFor="email" className="block text-gray-950 font-semibold my-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="">
            <label
              htmlFor="website"
              className="block text-gray-950 font-semibold my-2"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-blue-800"
              autoComplete="off"
            />
          </div>
          
          <div className="">
            <label
              htmlFor="phone"
              className="block text-gray-950 font-semibold my-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              autoComplete="off"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="">
            <label
              htmlFor="country"
              className="block text-gray-950 font-semibold my-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value="Nigeria"
              disabled
              className="w-full border border-gray-300 bg-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-800"
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="">
              <label
                htmlFor="state"
                className="block text-gray-950 font-semibold my-2"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                value={selectedState}
                onChange={handleStateChange}
                className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              >
                <option value="">Select state</option>
                {State.map((stateData) => (
                  <option key={stateData.state} value={stateData.state}>
                    {stateData.state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div className="">
              <label htmlFor="lga" className="block text-gray-950 font-semibold my-2">
                LGA
              </label>
              <select
                id="lga"
                name="lga"
                value={selectedLGA}
                onChange={handleLGAChange}
                disabled={!selectedState}
                className={`w-full border ${errors.lga ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              >
                <option value="">Select LGA</option>
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
              {errors.lga && <p className="text-red-500 text-sm mt-1">{errors.lga}</p>}
            </div>
          </div>

          <div className="">
            <label htmlFor="address" className="block text-gray-950 font-semibold my-2">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              autoComplete="off"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="">
            <label
              htmlFor="adminPassword"
              className="block text-gray-950 font-semibold my-2"
            >
              Admin Password
            </label>
            <input
              type="password"
              id="adminPassword"
              name="adminPassword"
              value={formData.adminPassword}
              onChange={handleChange}
              className={`w-full border ${errors.adminPassword ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              autoComplete="off"
            />
            {errors.adminPassword && <p className="text-red-500 text-sm mt-1">{errors.adminPassword}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-800 hover:bg-blue-600 text-white text-lh font-semibold rounded-xl p-4 w-full mt-5 flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Registering...
              </>
            ) : (
              'Register Institution'
            )}
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
