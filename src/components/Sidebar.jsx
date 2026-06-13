
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import ProfileDetails from "./ProfileDetails";
import { ServerUrl } from "../../Baseurl";
import Chatbox from "./Chatbox";


const Sidebar = () => {
      const [openSearch, setOpenSearch] = useState(false);
      const [showProfile, setshowProfile] = useState(false)

      const storeDetails = JSON.parse(localStorage.getItem("userDetails"));


      return (
            <aside className="w-[360px] h-screen border-r border-gray-200 bg-white flex flex-col select-none">

                  {/* Header */}
                  <div className="p-4 border-b border-gray-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                    <div className="relative group cursor-pointer"

                                    >
                                          <img
                                                src={`${ServerUrl}${storeDetails?.avatar}`}
                                                alt="Your profile"
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-gray-200 transition-all"
                                                onClick={() => { setshowProfile(prev => !prev) }}
                                          />
                                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                                    </div>

                                    <div>
                                          <h3 className="font-semibold text-sm text-gray-900 leading-tight">
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
                                          placeholder="Search conversations..."
                                          className="w-full rounded-xl shadow-md bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 placeholder:text-gray-400"
                                    />
                              </div>
                        </div>
                  </div>
                  <Chatbox />



                  {showProfile && <ProfileDetails onClose={() => { setshowProfile(false) }} />}
            </aside >
      );
};

export default Sidebar;
