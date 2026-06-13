import toast from "react-hot-toast";
import { BaseUrl, ServerUrl } from "../../Baseurl"
import { useEffect, useState } from "react";

const Chatbox = () => {
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
                        setStoreUser(response.data);
                        console.log(response.data)

                        if (!response.success) {
                              return toast.error("failed to fetch the user");
                        } else {
                              return toast.success("Users Fetched")
                        }

                  } catch (error) {
                        toast.error(error.message);
                  }
            };
            fetchingUsers()
      }, [token]);

      function changeTime(time) {
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
      }

      return (
            <div className="flex flex-col h-full bg-white">


                  {/* Users List */}
                  <div className="flex-1 overflow-y-auto">
                        {storeUser.map((val) => (
                              <div
                                    key={val._id}
                                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition border-b border-gray-100"
                              >
                                    {/* Avatar */}
                                    <div >
                                          <img
                                                src={`${ServerUrl}${val?.avatar}`}
                                                alt={val?.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                          />


                                    </div>

                                    {/* User Info */}
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

                                    {/* Time / Badge */}
                                    <div className="flex flex-col items-end">
                                          <span className="text-xs text-gray-400">
                                                {changeTime(val?.lastSeen)}
                                          </span>

                                          {val?.isOnline && (
                                                <span className="mt-1 w-2 h-2 bg-green-500 rounded-full" />
                                          )}
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      )
}

export default Chatbox