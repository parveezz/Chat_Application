import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../Baseurl";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Login() {
      const [userName, setUserName] = useState("");
      const [userPassword, setUserPassword] = useState("");
      const [loading, setLoading] = useState(false);

      const navigate = useNavigate();
      const loginUser = async (e) => {
            e.preventDefault();
            const url = `${BaseUrl}auth/login`;

            const trimmedemail = userName.trim();
            const trimmedPassword = userPassword.trim();

            if (trimmedPassword.length === 0) {
                  toast.error("Password is required");
                  return;
            }



            if (trimmedPassword.length < 8) {
                  toast.error("Password must be at least 8 characters");
                  return;
            }

            if (!trimmedemail) {
                  toast.error("Email is required");
                  return;
            }

            setLoading(true);

            try {
                  const data = await fetch(url, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              email: trimmedemail,
                              password: trimmedPassword
                        })
                  });
                  const response = await data.json();

                  if (response.email !== trimmedemail || response.password !== trimmedPassword) {
                        toast.error(response.message);
                        return
                  }

                  if (!response.success) {
                        toast.error("Failed to login")

                  } else {
                        localStorage.setItem("Token", response.token);
                        localStorage.setItem("userDetails", JSON.stringify(response.data));
                        toast.success("Login is Sucessfully");
                        navigate("/dashboard", { replace: true })
                  }
            } catch (e) {
                  console.log(e)
            } finally {
                  setLoading(false);
                  setUserName("");
                  setUserPassword("")
            }
      };



      return (
            <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 p-4 font-sans h-screen bg-[url('/login.avif')] bg-center bg-cover ">
                  <div className="w-full max-w-md rounded-2xl bg-white/85 backdrop-blur-sm p-8 shadow-xl">

                        {/* Header */}
                        <div className="text-center mb-8">
                              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                              <p className="text-sm text-gray-500 mt-1">Please enter your details to sign in</p>
                        </div>

                        {/* Form Elements */}
                        <form className="space-y-5" onSubmit={loginUser}>

                              {/* Email Input */}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                          type="email"
                                          placeholder="name@company.com"
                                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                          onChange={(e) => { setUserName(e.target.value) }}
                                    />
                              </div>

                              {/* Password Input */}
                              <div>
                                    <div className="flex justify-between items-center mb-1">
                                          <label className="block text-sm font-medium text-gray-700">
                                                Password
                                          </label>

                                          <Link
                                                to="/forgot-password"
                                                className="text-sm font-semibold text-blue-600 hover:underline"
                                          >
                                                Forgot Password?
                                          </Link>
                                    </div>
                                    <input
                                          type="password"
                                          placeholder="••••••••"
                                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                          onChange={(e) => { setUserPassword(e.target.value) }}
                                    />
                              </div>

                              {/* Action Button */}
                              <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white"
                              >
                                    {loading ? "Signing In..." : "Sign In"}
                              </button>
                        </form>

                        {/* Toggle Footer */}
                        <div className="text-center text-sm text-gray-600 mt-6">
                              Don't have an account?{' '}
                              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                                    Create an account
                              </Link>
                        </div>

                  </div>
            </div>
      );
}