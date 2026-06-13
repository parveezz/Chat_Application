import { ServerUrl } from "../../Baseurl";
import { IoSend } from "react-icons/io5";
import { HiDotsHorizontal, HiOutlinePhotograph } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import UserModal from "./UserModal";

const ChatWindow = ({ data }) => {
      const [openUserModal, setOpenUserModal] = useState(false);

      if (!data) return null;

      return (
            <div className="flex h-screen bg-white font-sans">

                  {/* Chat Area */}
                  <div
                        className={`flex flex-col transition-all duration-300 ${openUserModal
                              ? "w-[calc(100%-350px)]"
                              : "w-full"
                              }`}
                  >
                        {/* Header */}
                        <div className="flex items-center gap-4 p-4 border-b border-gray-200 bg-white shadow-sm">
                              <img
                                    src={`${ServerUrl}${data.avatar}`}
                                    alt={data.name}
                                    className="w-12 h-12 rounded-full object-cover"
                              />

                              <div className="flex items-center justify-between w-full">
                                    <span>
                                          <h2 className="font-semibold text-lg text-gray-800">
                                                {data.name}
                                          </h2>

                                          <p
                                                className={`text-sm ${data.isOnline
                                                      ? "text-green-600"
                                                      : "text-gray-500"
                                                      }`}
                                          >
                                                {data.isOnline ? "Online" : "Offline"}
                                          </p>
                                    </span>

                                    <button
                                          className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                                          onClick={() => setOpenUserModal(!openUserModal)}
                                    >
                                          <HiDotsHorizontal size={22} />
                                    </button>
                              </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                              <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-400">
                                          No messages yet
                                    </p>
                              </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                              <div className="flex items-center gap-2">

                                    <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                                          <FiPlus size={22} className="text-gray-600" />
                                    </button>

                                    <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                                          <HiOutlinePhotograph size={22} className="text-gray-600" />
                                    </button>

                                    <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3">
                                          <input
                                                type="text"
                                                placeholder="Type a message..."
                                                className="flex-1 bg-transparent px-2 py-3 outline-none text-sm"
                                          />

                                          <button className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
                                                <BsEmojiSmile
                                                      size={20}
                                                      className="text-gray-600"
                                                />
                                          </button>
                                    </div>

                                    <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition cursor-pointer shadow-sm">
                                          <IoSend size={18} />
                                    </button>

                              </div>
                        </div>
                  </div>

                  {/* Right Sidebar */}
                  {openUserModal && (
                        <UserModal
                              data={data}
                              onClose={() => setOpenUserModal(false)}
                        />
                  )}
            </div>
      );
};

export default ChatWindow;