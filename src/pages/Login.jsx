import React, { useState, useEffect } from "react";
import Bg from "../assets/auth.jpg";
import { Link } from "react-router-dom";
import { UseAppContext } from "../service/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { User, setUser } = UseAppContext();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    if (User) {
      if (User.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/questions');
      }
    }
  }, [User, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const HandleLogin = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      try {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('studentVoiceUsers') || '[]');
        
        const user = users.find(u => 
          u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          // Create session user (omitting password for security)
          const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'student' // Default to student if role not specified
          };
          
          setUser(sessionUser);
          toast.success("Login Successful");
          
          // Redirect based on role
          if (user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/student/questions');
          }
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
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
        <div>
          <h1 className="text-2xl font-semibold mb-4">Welcome back </h1>
          <p className="text-base font-medium text-black">
            A brand new day is here. it's a day to shape.
          </p>
          <p className="text-base font-medium text-black">
            Get started with giving your heart warming feedbacks.
          </p>
        </div>

        <form action="#" method="POST" className="grid gap-3">
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
          <div className="mb-4 flex items-center justify-end">
            <Link to="/confirm/email" className="underline hover:text-blue-700">
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            onClick={HandleLogin}
            disabled={isLoading}
            className="bg-blue-800 hover:bg-blue-600 text-white text-lh font-semibold rounded-xl p-4 w-full flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Logging in...
              </>
            ) : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-start">
          Don't have an account?
          <Link to="/register" className="hover:underline text-blue-700 ml-1">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
