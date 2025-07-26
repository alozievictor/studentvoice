import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from "../assets/auth.jpg";
import { UseAppContext } from "../service/context";
import { toast } from "react-toastify";

const Regester = () => {
  const navigate = useNavigate();
  const { User } = UseAppContext();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize users array in localStorage if it doesn't exist
    if (!localStorage.getItem('studentVoiceUsers')) {
      localStorage.setItem('studentVoiceUsers', JSON.stringify([]));
    }
    
    // Redirect if already logged in
    if (User) {
      navigate('/');
    }
  }, [User, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('studentVoiceUsers') || '[]');
        
        // Check if email already exists
        if (users.some(user => user.email === formData.email)) {
          setErrors(prev => ({ ...prev, email: "Email already in use" }));
          setIsSubmitting(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name: formData.fullname,
          email: formData.email,
          password: formData.password,
          role: 'student'
        };
        
        // Add user to array and save back to localStorage
        users.push(newUser);
        localStorage.setItem('studentVoiceUsers', JSON.stringify(users));
        
        toast.success("Registration successful! Please login");
        navigate('/login');
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <div className="bg-white flex justify-center items-center h-[100vh] overflow-hidden border p-4">
      <div className="w-1/2 h-screen hidden lg:block py-4">
        <img
          src={Bg}
          alt="photos"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold mb-4">Create Account</h1>
          <p className="text-base font-medium text-black">
            A few simple steps to join the StudentVoice community
          </p>
        </div>

        <form action="#" method="POST" className="grid gap-3">
          <div className="">
            <label
              htmlFor="fullname"
              className="block text-gray-950 font-semibold my-2"
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              autoComplete="off"
            />
            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
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
              htmlFor="password"
              className="block text-gray-950 font-semibold my-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl p-3 focus:outline-none focus:border-blue-800`}
              autoComplete="off"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="button"
            onClick={handleRegister}
            disabled={isSubmitting}
            className="bg-blue-800 hover:bg-blue-600 text-white text-lh font-semibold rounded-xl p-4 w-full mt-5 flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Registering...
              </>
            ) : 'Register'}
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <div className="text-start">
            Have an account?
            <Link to="/login" className="hover:underline text-blue-700 ml-1">
              Login
            </Link>
          </div>
          <Link to="/Register/institution" className="text-blue-700 hover:font-semibold">
            Register your institution
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Regester;
