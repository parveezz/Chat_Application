import { useNavigate } from "react-router-dom";

const Dashboard = () => {

      const userData = localStorage.getItem("userDetails");
      const data = JSON.parse(userData);
      const navigate = useNavigate()

      const logout = () => {
            localStorage.removeItem('Token');
            navigate("/login")
      }
      return (
            <section className="h-screen flex items-center justify-center bg-slate-100 p-4">
                  <article className="w-full max-w-5xl h-[700px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                              <div>

                                    <span>
                                          <h1 className="text-xl font-bold">{data?.name}</h1>
                                          <p className={`"text-sm text-gray-500 ${data?.isOnline ? "text-green-400" : "bg-text-red"}`}>Online</p>
                                    </span>
                              </div>

                              <button className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                                    onClick={() => { logout() }}
                              >
                                    Logout
                              </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">

                              <div className="flex">
                                    <div className="bg-gray-200 px-4 py-3 rounded-xl max-w-xs">
                                          Hello 👋
                                    </div>
                              </div>

                              <div className="flex justify-end">
                                    <div className="bg-blue-500 text-white px-4 py-3 rounded-xl max-w-xs">
                                          Hi, how are you?
                                    </div>
                              </div>

                              <div className="flex">
                                    <div className="bg-gray-200 px-4 py-3 rounded-xl max-w-xs">
                                          I'm doing great.
                                    </div>
                              </div>

                              <div className="flex justify-end">
                                    <div className="bg-blue-500 text-white px-4 py-3 rounded-xl max-w-xs">
                                          Awesome 🚀
                                    </div>
                              </div>

                        </div>

                        {/* Input Area */}
                        <div className="border-t p-4 flex gap-3">
                              <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                              />

                              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                                    Send
                              </button>
                        </div>

                  </article>
            </section >
      );
};

export default Dashboard;