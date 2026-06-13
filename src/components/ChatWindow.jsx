import { ServerUrl } from "../../Baseurl";
import { IoSend } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";

const ChatWindow = ({ data }) => {
      if (!data) return null;

      return (
            <div className="flex flex-col h-screen bg-white">
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


                              <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                                    <HiDotsHorizontal size={22} />
                              </div>
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
                        <div className="flex items-center gap-3">
                              <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-blue-500"
                              />

                              <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                                    <IoSend size={18} />
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default ChatWindow;