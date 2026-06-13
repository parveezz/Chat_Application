
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import ProfileDetails from "./ProfileDetails";
import { ServerUrl } from "../../Baseurl";
import Chatbox from "./Chatbox";

const Sidebar = ({ setSelectedUser }) => {
      const [openSearch, setOpenSearch] = useState(false);
      const [filterName, setFilterName] = useState("")

      const [showProfile, setshowProfile] = useState(false)
      const [time, setTime] = useState({
            hours: "00",
            minutes: "00",
            seconds: "00",
            period: "AM",
      });

      const storeDetails = JSON.parse(localStorage.getItem("userDetails"));

      useEffect(() => {
            const updateTime = () => {
                  const now = new Date();

                  const hourString = now.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        hour12: true,
                  });

                  const hours = hourString.split(" ")[0];
                  const period = hourString.split(" ")[1];

                  const minutes = now.toLocaleTimeString("en-US", {
                        minute: "2-digit",
                  });

                  const seconds = now.toLocaleTimeString("en-US", {
                        second: "2-digit",
                  });


                  setTime({
                        hours,
                        minutes,
                        seconds,
                        period,
                  });
            };

            updateTime(); // run immediately

            const interval = setInterval(updateTime, 1000);

            return () => clearInterval(interval);
      }, []);

      return (
            <aside className="relative w-full sm:w-[320px] md:w-[360px] h-screen border-r border-gray-200 bg-white flex flex-col select-none overflow-hidden">

                  {/* Header */}
                  <div className="p-4 border-b border-gray-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                    <div className=" group cursor-pointer"

                                    >
                                          <img
                                                src={`${ServerUrl}${storeDetails?.avatar}`}
                                                alt="Your profile"
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-gray-200 transition-all"
                                                onClick={() => { setshowProfile(prev => !prev) }}
                                          />
                                    </div>

                                    <div className="min-w-0">
                                          <h3 className="font-semibold text-sm text-gray-900 leading-tight truncate">
                                                {storeDetails?.name}
                                          </h3>
                                          <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 "></span>
                                                <p className="text-xs text-gray-500 font-medium">Online</p>
                                          </div>
                                    </div>
                              </div>

                              <div className="flex items-center justify-end gap-1">

                                    {openSearch == false ? <button
                                          onClick={() => setOpenSearch(!openSearch)}
                                          className="h-9 w-9 rounded-xl border border-gray-100 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
                                    >
                                          <FiSearch size={18} />
                                    </button>

                                          :

                                          <button
                                                onClick={() => setOpenSearch(false)}
                                                className="text-gray-500 hover:text-red-500 cursor-pointer mr-2"
                                          >
                                                <FiX size={20} />
                                          </button>
                                    }

                              </div>
                        </div>

                        {/* Search Bar */}
                        <div
                              className={`transition-all duration-300 overflow-hidden ${openSearch
                                    ? "max-h-16 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                        >
                              <div className="relative mt-2 shadow-md">
                                    <FiSearch
                                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 "
                                          size={18}
                                    />

                                    <input
                                          type="text"
                                          placeholder="Search..."
                                          className="w-full rounded-xl shadow-md bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 placeholder:text-gray-400"
                                          onChange={(e) => { setFilterName(e.target.value) }}
                                    />
                              </div>
                        </div>
                  </div>

                  {/* chat box */}
                  <Chatbox
                        filterName={filterName}
                        setSelectedUser={setSelectedUser}
                  />


                  <div className="mt-auto px-2 sm:px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">

                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                                    <span className="text-base sm:text-base sm:text-base sm:text-base sm:text-base sm:text-lg font-bold text-slate-800">
                                          {time.hours}
                                    </span>
                              </div>

                              <span className="text-gray-300 font-bold">:</span>

                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                                    <span className="text-base sm:text-base sm:text-base sm:text-base sm:text-base sm:text-lg font-bold text-slate-800">
                                          {time.minutes}
                                    </span>
                              </div>

                              <span className="text-gray-300 font-bold">:</span>

                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                                    <span className="text-base sm:text-base sm:text-base sm:text-base sm:text-base sm:text-lg font-bold text-slate-800">
                                          {time.seconds}
                                    </span>
                              </div>

                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-800 text-white shadow-sm flex items-center justify-center">
                                    <span className="text-sm font-bold">
                                          {time.period}
                                    </span>
                              </div>

                        </div>
                  </div>
                  <ProfileDetails
                        isOpen={showProfile}
                        onClose={() => setshowProfile(false)}
                  />
            </aside >
      );
};

export default Sidebar;
