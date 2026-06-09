import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
import ChatWindow from "../components/ChatWindow";


const Dashboard = () => {
      return (
            <>
                  <section className="w-full flex items-start h-screen">
                        <div className="flex-1 h-screen w-[30%] bg-amber-100">
                              <Sidebar />
                        </div>
                        <div className="w-70% flex-4 bg-gray-300 h-screen">
                              <div>
                                    <Navbar />
                              </div>
                              <div>
                                    <ChatWindow />
                              </div>
                              <div>
                                    <Message />
                              </div>
                        </div>
                  </section>
                  <Outlet />
            </>
      );
};

export default Dashboard;


