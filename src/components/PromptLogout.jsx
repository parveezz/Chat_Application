import { LogOut, X } from "lucide-react";

const PromptLogout = ({ onClose, onLogout }) => {
      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="w-[320px] rounded-xl bg-white p-5 shadow-2xl">

                        {/* Close */}
                        <div className="flex justify-end">
                              <button
                                    onClick={onClose}
                                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                              >
                                    <X size={16} />
                              </button>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col items-center text-center -mt-2">
                              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                    <LogOut size={18} className="text-red-500" />
                              </div>

                              <h2 className="text-sm font-semibold text-gray-800">
                                    Logout
                              </h2>

                              <p className="mt-1 text-xs text-gray-500">
                                    Are you sure you want to logout?
                              </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex justify-center gap-2">
                              <button
                                    onClick={onClose}
                                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition"
                              >
                                    Cancel
                              </button>

                              <button
                                    onClick={onLogout}
                                    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition"
                              >
                                    Logout
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default PromptLogout;