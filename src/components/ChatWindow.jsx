
import { IoSend } from "react-icons/io5";
import { HiDotsHorizontal, HiOutlinePhotograph } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import UserModal from "./UserModal";
import { sockets } from "../../sockets";
import toast from "react-hot-toast";
import { ServerUrl } from "../../ServerUrl";
import { BaseUrl } from "../../Baseurl";

const ChatWindow = ({ data }) => {
      const [openUserModal, setOpenUserModal] = useState(false);
      const [message, setMessage] = useState("");
      const [recievedMessage, setRecievedMessages] = useState([]);

      const token = localStorage.getItem("Token")
      const messagesEndRef = useRef(null);

      useEffect(() => {
            messagesEndRef.current?.scrollIntoView({
                  behavior: "smooth"
            });
      }, [recievedMessage]);

      if (!data) return null;

      // sending the data from the frontend to backend and making connection 
      const sendMessage = () => {
            if (!message.trim()) {
                  toast.error("Enter the Message")
                  return
            }

            sockets.emit("sendMessage", {
                  message: message,
                  receiverId: data._id,
            })


            setMessage("")
      }

      useEffect(() => {
            sockets.connect();

            sockets.on("connect", () => {
                  console.log("Connected:", sockets.id);
            })

            sockets.on("error", (err) => {
                  toast.error(err.message || "Socket Error");
            });

            sockets.on("disconnect", () => {
                  toast.error("Socket Disconnected");
            });

            sockets.on("receiveMessage", (data) => {
                  setRecievedMessages((prev) => [...prev, data]);
            });


            return () => {
                  sockets.off("connect");
                  sockets.off("disconnect");
                  sockets.off("error");
                  sockets.off("receiveMessage")
                  sockets.disconnect();
            }
      }, []);

      //storing the message

      useEffect(() => {

            const fetchMessages = async () => {
                  try {

                        const response = await fetch(
                              `${BaseUrl}messages/${data?._id}`,
                              {
                                    method: "GET",
                                    headers: {
                                          "Content-Type": "application/json",
                                          Authorization: `Bearer ${token}`,
                                    },
                              }
                        );

                        const result = await response.json();

                        console.log(result);

                        if (result.success) {
                              setRecievedMessages(result.data);
                        } else {
                              toast.error(result.message);
                        }

                  } catch (error) {
                        toast.error(error.message);
                  }
            };

            if (data?._id) {
                  fetchMessages();
            }

      }, [data?._id, token]);

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
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-2">

                              {recievedMessage.map((msg) => {
                                    const isReceiver = msg.senderId === data._id;

                                    return (
                                          <div
                                                key={msg._id}
                                                className={`flex ${isReceiver
                                                      ? "justify-start"
                                                      : "justify-end"
                                                      }`}
                                          >
                                                <div
                                                      className={`max-w-xs px-4 py-2 rounded-2xl shadow break-words ${isReceiver
                                                            ? "bg-sky-200 text-gray-800"
                                                            : "bg-yellow-100 text-gray-800"
                                                            }`}
                                                >
                                                      {msg.message}
                                                </div>
                                          </div>
                                    );
                              })}
                              <div ref={messagesEndRef} />
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
                                                value={message}
                                                placeholder="Type a message..."
                                                className="flex-1 bg-transparent px-2 py-3 outline-none text-sm"
                                                onChange={(e) => { setMessage(e.target.value) }}
                                                onKeyDown={(e) => {
                                                      if (e.key === "Enter") {
                                                            sendMessage()
                                                      }
                                                }}
                                          />

                                          <button className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"

                                          >
                                                <BsEmojiSmile
                                                      size={20}
                                                      className="text-gray-600"
                                                />
                                          </button>
                                    </div>

                                    <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition cursor-pointer shadow-sm"

                                          onClick={() => { sendMessage() }}
                                    >
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