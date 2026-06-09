import { useState } from "react"
import { Link } from "react-router-dom"
import { BaseUrl } from "../../Baseurl";
import toast from "react-hot-toast";


const Register = () => {
      const [userName, setUserName] = useState("");
      const [userPassword, setUserPassword] = useState("");
      const [userEmail, setUserEmail] = useState("");
      const [image, setImage] = useState(null);

      const registerUser = async (e) => {
            e.preventDefault();

            const trimmedName = userName.trim();
            const trimmedEmail = userEmail.trim().toLowerCase();
            const trimmedPassword = userPassword.trim();

            // Name Validation
            if (!trimmedName) {
                  toast.error("Name is required");
                  return;
            }

            if (trimmedName.length < 3) {
                  toast.error("Name must be at least 3 characters");
                  return;
            }

            // Email Validation
            if (!trimmedEmail) {
                  toast.error("Email is required");
                  return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(trimmedEmail)) {
                  toast.error("Please enter a valid email");
                  return;
            }

            // Password Validation
            if (!trimmedPassword) {
                  toast.error("Password is required");
                  return;
            }

            if (trimmedPassword.length < 8) {
                  toast.error("Password must be at least 8 characters");
                  return;
            }

            // Image Validation
            if (!image) {
                  toast.error("Please select an avatar image");
                  return;
            }

            const formData = new FormData();

            formData.append("name", trimmedName);
            formData.append("email", trimmedEmail);
            formData.append("password", trimmedPassword);
            formData.append("avatar", image);

            try {
                  const response = await fetch(`${BaseUrl}auth/register`, {
                        method: "POST",
                        body: formData,
                  });

                  const data = await response.json();

                  if (!data.success) {
                        toast.error(data.message || "Registration failed");
                        return;
                  }

                  toast.success("Registration successful");
            } catch (error) {
                  console.log(error);
                  toast.error("Something went wrong");
            }
      };

      return (
            <div className="flex min-h-screen w-screen items-center justify-center p-4 font-sans bg-[url('/register.avif')] bg-cover bg-center">
                  <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-md">

                        {/* Header */}
                        <div className="text-center mb-8">
                              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                              <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
                        </div>

                        {/* Form Elements */}
                        <form className="space-y-5" onSubmit={registerUser} >

                              {/* Name Input */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                          type="text"
                                          placeholder="John Doe"
                                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                          onChange={(e) => { setUserName(e.target.value) }}
                                    />
                              </div>

                              {/* Email Input */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input
                                          type="email"
                                          placeholder="name@company.com"
                                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                          onChange={(e) => { setUserEmail(e.target.value) }}
                                    />
                              </div>

                              {/* Password Input */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                    <input
                                          type="password"
                                          placeholder="••••••••"
                                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                          onChange={(e) => { setUserPassword(e.target.value) }}
                                    />
                              </div>

                              {/* Avatar File Input */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Image</label>
                                    <input
                                          type="file"
                                          accept="image/*"
                                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                                          onChange={(e) => { setImage(e.target.files[0]) }}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Supports JPG, JPEG, PNG, GIF, or WEBP</p>
                              </div>

                              {/* Action Button */}
                              <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:bg-gray-950"
                              >
                                    Register
                              </button>
                        </form>

                        {/* Toggle Footer */}
                        <div className="text-center text-sm text-gray-600 mt-6">
                              Already have an account?{' '}
                              <Link to="/" className="font-semibold text-blue-600 hover:underline">
                                    Log in here
                              </Link>
                        </div>

                  </div>
            </div>
      )
}

export default Register