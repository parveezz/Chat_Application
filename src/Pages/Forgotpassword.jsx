import { useState } from "react";
import { BaseUrl } from "../../Baseurl";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [storeEmail, setStoreEmail] = useState("")

    const forgotPass = async (e) => {
        e.preventDefault();

        const url = `${BaseUrl}auth/forgotpassword`;
        try {
            const data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: storeEmail
                })
            });
            const response = await data.json();
            if (!response.ok) {
                toast.error(response.message)
            } else {
                toast.success(response.message || "Reset link sent successfully!");
            }

        } catch (e) {
            console.log(e);
        } finally {
            setStoreEmail("")
        }
    }


    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 p-4 font-sans bg-[url('/forgotpassword.avif')] bg-cover bg-center">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
                    <p className="text-sm text-gray-500 mt-1">Enter your email to receive a reset link</p>
                </div>

                {/* Form Elements */}
                <form className="space-y-5" onSubmit={forgotPass}>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => { setStoreEmail(e.target.value) }}
                        />
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Toggle Footer */}
                <div className="text-center text-sm text-gray-600 mt-6">
                    Remember your password?{' '}
                    <a href="/login" className="font-semibold text-blue-600 hover:underline">
                        Login here
                    </a>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword