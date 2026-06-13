import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { FaComments } from "react-icons/fa";

const Dashboard = () => {
      const [selectedUser, setSelectedUser] = useState(null);

      return (
            <section className="w-full h-screen flex bg-gray-100">
                  <div className={`w-full md:w-[360px] bg-white border-r border-gray-200 shadow-sm ${selectedUser ? "hidden md:block" : "block"}`}>
                        <Sidebar setSelectedUser={setSelectedUser} />
                  </div>

                  <div className={`flex-1 bg-gray-50 ${selectedUser ? "block" : "hidden md:block"}`}>
                        {selectedUser ? (
                              <ChatWindow data={selectedUser} setSelectedUser={setSelectedUser} />
                        ) : (
                              <div className="h-full flex items-center justify-center">
                                    <div className="text-center">
                                          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                                <FaComments className="text-5xl text-gray-600" />
                                          </div>

                                          <h2 className="text-2xl font-semibold text-gray-800">
                                                Welcome to Chat App
                                          </h2>

                                          <p className="mt-2 text-gray-500 max-w-md">
                                                Select a conversation from the Chatbox to start chatting.
                                          </p>
                                    </div>
                              </div>
                        )}
                  </div>
            </section>
      );
};

export default Dashboard;