import toast from "react-hot-toast";
import { BaseUrl, ServerUrl } from "../../Baseurl";
import { useEffect, useState } from "react";

const Chatbox = ({ filterName, setSelectedUser }) => {
      const [storeUser, setStoreUser] = useState([]);

      const token = localStorage.getItem("Token");

      useEffect(() => {
            const fetchingUsers = async () => {
                  try {
                        const data = await fetch(`${BaseUrl}users`, {
                              method: "GET",
                              headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                              },
                        });

                        const response = await data.json();

                        if (!response.success) {
                              return toast.error("Failed to fetch users");
                        }

                        setStoreUser(response.data);
                  } catch (error) {
                        toast.error(error.message);
                  }
            };

            fetchingUsers();
      }, [token]);

      const filteringArray = filterName?.trim()
            ? storeUser.filter((val) =>
                  val?.name?.toLowerCase().includes(filterName.toLowerCase())
            )
            : storeUser;

      const changeTime = (time) => {
            if (!time) return "Never";

            const lastSeen = new Date(time);
            const now = new Date();

            const diff = now - lastSeen;

            const minutes = Math.floor(diff / (1000 * 60));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            if (minutes < 60) {
                  return `${minutes} min ago`;
            }

            if (hours < 24) {
                  return `${hours} hrs ago`;
            }

            return `${days} days ago`;
      };

      return (
            <div className="flex flex-col h-full bg-white">
                  <div className="flex-1 overflow-y-auto">
                        {filteringArray.length > 0 ? (
                              filteringArray.map((val) => (
                                    <div
                                          key={val._id}
                                          onClick={() => setSelectedUser(val)}
                                          className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition"
                                    >
                                          {/* Avatar */}
                                          <div className="relative">
                                                <img
                                                      src={
                                                            val?.avatar
                                                                  ? `${ServerUrl}${val.avatar}`
                                                                  : "/default-avatar.png"
                                                      }
                                                      alt={val?.name}
                                                      className="w-12 h-12 rounded-full object-cover"
                                                />

                                                {val?.isOnline && (
                                                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                                )}
                                          </div>

                                          {/* User Details */}
                                          <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-800 truncate">
                                                      {val?.name}
                                                </h3>

                                                <p
                                                      className={`text-sm ${val?.isOnline
                                                            ? "text-green-600"
                                                            : "text-gray-500"
                                                            }`}
                                                >
                                                      {val?.isOnline
                                                            ? "Online"
                                                            : "Offline"}
                                                </p>
                                          </div>

                                          {/* Last Seen */}
                                          <div>
                                                <span className="text-xs text-gray-400">
                                                      {!val?.isOnline &&
                                                            changeTime(val?.lastSeen)}
                                                </span>
                                          </div>
                                    </div>
                              ))
                        ) : (
                              <div className="flex items-center justify-center h-40">
                                    <p className="text-sm text-gray-500">
                                          No users found
                                          {filterName && ` for "${filterName}"`}
                                    </p>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default Chatbox;