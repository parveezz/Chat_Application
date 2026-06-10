import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
      const [searchQuery, setSearchQuery] = useState("");

      const userData = JSON.parse(
            localStorage.getItem("userDetails")
      );

      console.log(userData);

      const users = [
            { id: 1, name: "John Doe", lastMsg: "Hey, are we still meeting today?", time: "10:42 AM" },
            { id: 2, name: "Sarah Smith", lastMsg: "Sent a photo", time: "Yesterday" },
            { id: 3, name: "Ahmed Khan", lastMsg: "Let me check the files.", time: "Monday" },
            { id: 4, name: "Priya Sharma", lastMsg: "Awesome! Thanks.", time: "Oct 12" },
            { id: 5, name: "David Wilson", lastMsg: "Typing...", time: "Just now", isTyping: true },
            { id: 6, name: "Ali Hassan", lastMsg: "Sounds good to me.", time: "Oct 10" },
      ];

      // Filter users based on search input
      const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Fallback helper to extract initials for avatars
      const getInitials = (name) => {
            return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
      };

      return (
            <section className="flex flex-col h-screen w-full max-w-sm border-r border-stone-200 bg-[#FAF7F2] shadow-lg font-sans">

                  {/* Header & Search */}
                  <div className="p-3 border-b border-stone-200 bg-[#F5F1EA] sticky top-0 z-10">
                        <div className="flex items-center justify-between mb-3">
                              <h1 className="text-xl font-bold tracking-tight uppercase text-stone-800">
                                    Chat Application
                              </h1>
                        </div>

                        <input
                              type="text"
                              placeholder="Search conversations..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                        />
                  </div>

                  {/* Users List */}
                  <section className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                        {filteredUsers.map((user) => (
                              <div
                                    key={user.id}
                                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#F2EEE8] cursor-pointer transition-all duration-150"
                              >
                                    <div className="relative flex-shrink-0">
                                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-semibold text-xs">
                                                {getInitials(user.name)}
                                          </div>

                                          {user.id % 2 === 0 && (
                                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-[#FAF7F2] bg-emerald-500" />
                                          )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between">
                                                <h3 className="font-medium text-sm text-stone-800 truncate">
                                                      {user.name}
                                                </h3>

                                                <span className="text-[10px] text-stone-400">
                                                      {user.time}
                                                </span>
                                          </div>

                                          <p
                                                className={`text-[11px] truncate ${user.isTyping
                                                      ? "text-emerald-600 font-medium italic"
                                                      : "text-stone-500"
                                                      }`}
                                          >
                                                {user.lastMsg}
                                          </p>
                                    </div>
                              </div>
                        ))}
                  </section>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-3 py-2 border-t border-stone-200 bg-[#F5F1EA]">
                        <section>
                              <Link to="/dashboard/settings">
                                    <div className="flex items-center gap-2">
                                          <div className="relative">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
                                                      ME
                                                </div>

                                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#F5F1EA]"></span>
                                          </div>

                                          <div>
                                                <p className="text-sm font-semibold text-stone-800">
                                                      My Profile
                                                </p>
                                                <p className="text-[11px] text-stone-500">
                                                      Online
                                                </p>
                                          </div>
                                    </div>

                                    <Link
                                          to="/dashboard/settings"
                                          className="p-2 rounded-full hover:bg-stone-200 transition-colors"
                                    >
                                          <IoSettingsSharp size={18} className="text-stone-600" />
                                    </Link>
                              </Link>
                        </section>
                  </div>

            </section>
      );
};

export default Sidebar;