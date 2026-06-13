import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack, IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { BaseUrl } from "../../Baseurl";
import PromptLogout from "./PromptLogout";
import { ServerUrl } from "../../ServerUrl";

const ProfileDetails = ({ isOpen, onClose }) => {
      const [storeInfo, setStoreInfo] = useState(null);
      const [openLogout, setOpenLogout] = useState(false);
      const [about, setAbout] = useState("");
      const [saving, setSaving] = useState(false);

      const navigate = useNavigate();
      const token = localStorage.getItem("Token");

      const fetchProfile = async () => {
            try {
                  const response = await fetch(`${BaseUrl}auth/profile`, {
                        method: "GET",
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                        },
                  });

                  const data = await response.json();

                  if (data.success) {
                        setStoreInfo(data.data);
                        setAbout(data.data?.about || "");
                  }
            } catch (error) {
                  toast.error(error.message);
            }
      };

      useEffect(() => {
            if (isOpen) fetchProfile();
      }, [isOpen]);

      const updateUser = async () => {
            setSaving(true);
            try {
                  const response = await fetch(`${BaseUrl}users/profile`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ about }),
                  });

                  const data = await response.json();

                  if (!data.success) {
                        toast.error("Failed to save About");
                        return;
                  }

                  toast.success(data.message);
                  await fetchProfile();
            } catch (error) {
                  toast.error(error.message);
            } finally {
                  setSaving(false);
            }
      };

      const logoutFns = () => {
            localStorage.clear();
            navigate("/login");
      };

      const hasChanges = about !== (storeInfo?.about || "");

      return (
            <div
                  className={`fixed top-0 left-0 h-full w-[360px] bg-slate-50 flex flex-col z-50 shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
            >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60 bg-white flex-shrink-0">
                        <div className="flex items-center gap-3">
                              <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-1.5 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition cursor-pointer"
                              >
                                    <IoArrowBack size={18} />
                              </button>
                              <h2 className="text-sm font-semibold text-slate-800 tracking-tight">
                                    Profile Settings
                              </h2>
                        </div>
                  </div>

                  {/* Main Content Area (No Scroll, Flex Columns create the empty bottom space) */}
                  <div className="flex-1 flex flex-col p-5 space-y-5 overflow-hidden">

                        {/* Profile Card */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-lg flex-shrink-0">
                              <div className="absolute -right-10 -top-10 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                              <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl" />

                              <div className="relative flex flex-col items-center text-center">
                                    <div className="relative">
                                          <img
                                                src={`${ServerUrl}${storeInfo?.avatar}`}
                                                alt="Profile"
                                                className="w-20 h-20 rounded-full border-4 border-white/10 shadow-md object-cover"
                                                onError={(e) => {
                                                      e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                                                }}
                                          />
                                          <span
                                                className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${storeInfo?.isOnline ? "bg-emerald-400" : "bg-slate-400"
                                                      }`}
                                          />
                                    </div>

                                    <h3 className="mt-3 text-base font-bold tracking-tight text-white/95">
                                          {storeInfo?.name || "Loading Name..."}
                                    </h3>
                                    <p className="text-[10px] font-semibold text-indigo-200/60 mt-0.5 tracking-wider uppercase">
                                          {storeInfo?.isOnline ? "Available" : "Away"}
                                    </p>
                              </div>
                        </div>

                        {/* Info Group */}
                        <div className="space-y-3 flex-shrink-0">
                              {/* Email Field */}
                              <div className="bg-white border border-slate-200/60 rounded-xl p-3.5 flex items-start gap-3 shadow-sm">
                                    <IoMailOutline className="text-slate-400 mt-0.5" size={16} />
                                    <div className="flex-1 min-w-0">
                                          <p className="text-[11px] font-medium text-slate-400">Email Address</p>
                                          <p className="text-xs font-semibold text-slate-700 break-all">
                                                {storeInfo?.email || "—"}
                                          </p>
                                    </div>
                              </div>

                              {/* About Field */}
                              <div className="bg-white border border-slate-200/60 rounded-xl p-3.5 shadow-sm">
                                    <div className="flex items-center gap-3 mb-2.5">
                                          <IoPersonOutline className="text-slate-400" size={16} />
                                          <p className="text-[11px] font-medium text-slate-400">Bio / About</p>
                                    </div>

                                    <textarea
                                          rows={3}
                                          value={about}
                                          onChange={(e) => setAbout(e.target.value.slice(0, 250))}
                                          placeholder="Tell us about yourself..."
                                          className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none resize-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition duration-200"
                                    />

                                    <div className="mt-1.5 flex justify-between items-center text-[10px] text-slate-400">
                                          <span>Brief summary</span>
                                          <span className={about.length >= 240 ? "text-amber-500 font-medium" : ""}>
                                                {about.length}/250
                                          </span>
                                    </div>

                                    {/* Dynamic Save Changes Button */}
                                    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${hasChanges ? "mt-3 max-h-12 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                                          }`}>
                                          <button
                                                onClick={updateUser}
                                                disabled={saving}
                                                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-semibold rounded-lg transition active:scale-[0.99]"
                                          >
                                                {saving ? "Saving..." : "Save Changes"}
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {/* This empty div absorbs all remaining spatial height to pad the log-out button down cleanly */}
                        <div className="flex-1" />

                  </div>

                  {/* Bottom Fixed Action Area */}
                  <div className="border-t border-slate-200/60 p-4 bg-white flex-shrink-0">
                        <button
                              type="button"
                              onClick={() => setOpenLogout(true)}
                              className="w-full py-2.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-semibold transition active:scale-[0.99] cursor-pointer"
                        >
                              Sign Out
                        </button>
                  </div>

                  {/* Logout Dialog */}
                  {openLogout && (
                        <PromptLogout
                              onClose={() => setOpenLogout(false)}
                              onLogout={logoutFns}
                        />
                  )}
            </div>
      );
};

export default ProfileDetails;