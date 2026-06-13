
import { IoClose } from "react-icons/io5";
import { ServerUrl } from "../../ServerUrl";

const UserModal = ({ data, onClose }) => {
      if (!data) return null;

      return (
            <div className="w-[350px] h-full bg-white border-l border-gray-200 shadow-sm flex flex-col">

                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="font-semibold text-lg text-gray-800">
                              Contact Info
                        </h2>

                        <button
                              onClick={onClose}
                              className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                              <IoClose size={22} />
                        </button>
                  </div>

                  {/* Profile Section */}
                  <div className="p-6 flex flex-col items-center border-b border-gray-100">

                        <img
                              src={`${ServerUrl}${data.avatar}`}
                              alt={data.name}
                              className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
                        />

                        <h3 className="mt-4 text-xl font-bold text-gray-800">
                              {data.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-2">
                              <span
                                    className={`w-2.5 h-2.5 rounded-full ${data.isOnline
                                          ? "bg-green-500"
                                          : "bg-gray-400"
                                          }`}
                              />

                              <span
                                    className={`text-sm ${data.isOnline
                                          ? "text-green-600"
                                          : "text-gray-500"
                                          }`}
                              >
                                    {data.isOnline ? "Online" : "Offline"}
                              </span>
                        </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-4">

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Email
                              </p>

                              <p className="text-sm text-gray-800 break-all">
                                    {data.email}
                              </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    About
                              </p>

                              <p className="text-sm text-gray-800">
                                    {data.about || "No bio available"}
                              </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    User ID
                              </p>

                              <p className="text-xs text-gray-700 break-all">
                                    {data._id}
                              </p>
                        </div>

                  </div>

                  {/* Future Space */}
                  <div className="flex-1"></div>

            </div>
      );
};

export default UserModal;