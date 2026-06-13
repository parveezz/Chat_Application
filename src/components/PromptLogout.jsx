import { LogOut, X } from "lucide-react";

const PromptLogout = ({ onClose, onLogout }) => {
      return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                  {/* Modal Container */}
                  <div className="w-[310px] rounded-2xl bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-100 transform transition-all scale-100 animate-zoom-in">

                        {/* Header/Close Action */}
                        <div className="flex justify-end">
                              <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition duration-200 cursor-pointer"
                              >
                                    <X size={15} />
                              </button>
                        </div>

                        {/* Informational Content */}
                        <div className="flex flex-col items-center text-center -mt-1">
                              {/* Animated Ambient Icon Ring */}
                              <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 border border-red-100/50 shadow-sm shadow-red-100">
                                    <LogOut size={16} className="text-red-500 ml-0.5" />
                              </div>

                              <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                                    Sign Out
                              </h2>

                              <p className="mt-1.5 text-[11px] leading-normal text-slate-400 max-w-[220px]">
                                    Are you sure you want to log out? You will need to re-authenticate to access your account.
                              </p>
                        </div>

                        {/* Action Controls */}
                        <div className="mt-5 flex items-center justify-center gap-2">
                              <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 rounded-xl bg-slate-100/80 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/70 active:scale-[0.98] transition duration-200 cursor-pointer"
                              >
                                    Cancel
                              </button>

                              <button
                                    type="button"
                                    onClick={onLogout}
                                    className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 active:scale-[0.98] shadow-md shadow-slate-950/10 transition duration-200 cursor-pointer"
                              >
                                    Log Out
                              </button>
                        </div>

                  </div>
            </div>
      );
};

export default PromptLogout;