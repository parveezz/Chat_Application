import toast from "react-hot-toast";
import { BaseUrl, ServerUrl } from "../../Baseurl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDetails = ({ onClose }) => {
      const [storeInfo, setStoreInfo] = useState(null);
      const [about, setAbout] = useState("");
      const [saving, setSaving] = useState(false);

      const navigate = useNavigate();
      const token = localStorage.getItem("Token");
      //fetch profile

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
            fetchProfile();
      }, []);
      //update user
      const updateUser = async () => {
            setSaving(true);

            try {
                  const response = await fetch(`${BaseUrl}users/profile`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                              about,
                        }),
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

      //Logout
      const logoutFns = () => {
            localStorage.clear()
            navigate("/login")
      }
      return (
            <div className="absolute top-0 right-0 h-full w-[380px] bg-white border-l border-gray-200 shadow-xl flex flex-col z-50">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-800">
                              Profile Settings
                        </h2>

                        <button
                              type="button"
                              onClick={onClose}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-red-50 hover:text-red-500 transition"
                        >
                              ✕
                        </button>
                  </div>

                  <div className="p-6">

                        {/* Profile Card */}
                        <div className="bg-gradient-to-r from-slate-500 to-gray-600 rounded-2xl p-5 text-white mb-6">
                              <div className="flex items-center gap-4">

                                    <img
                                          src={`${ServerUrl}${storeInfo?.avatar}`}
                                          alt="Profile"
                                          className="w-20 h-20 rounded-full border-4 border-white object-cover"
                                    />

                                    <div>
                                          <h3 className="text-xl font-bold">
                                                {storeInfo?.name}
                                          </h3>

                                          <p className="text-blue-100">
                                                {storeInfo?.email}
                                          </p>

                                          <span
                                                className={`font-medium ${storeInfo?.isOnline
                                                      ? "text-green-300"
                                                      : "text-red-300"
                                                      }`}
                                          >
                                                {storeInfo?.isOnline
                                                      ? "Online"
                                                      : "Offline"}
                                          </span>
                                    </div>

                              </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-gray-50 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                                    About
                              </h4>

                              <textarea
                                    rows={4}
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    placeholder="Tell us about yourself..."
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                              />

                              <div className="mt-2 text-xs text-gray-500">
                                    {about.length}/250
                              </div>

                              {about !== (storeInfo?.about || "") && (
                                    <div className="flex justify-end mt-4">
                                          <button
                                                onClick={updateUser}
                                                disabled={saving}
                                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                          >
                                                {saving ? "Saving..." : "Save"}
                                          </button>
                                    </div>
                              )}
                        </div>
                        <div className="flex items-center justify-end mt-4">
                              <button
                                    type="button"
                                    className="px-5 py-2.5 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-600 active:scale-95 transition-all duration-200"
                                    onClick={() => { logoutFns() }}
                              >
                                    Logout
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default ProfileDetails;