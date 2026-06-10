import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Message = () => {
      const navigate = useNavigate();
      const logoutFns = () => {
            localStorage.removeItem("Token");
            localStorage.clear();
            toast.success("logged ")
            navigate("/")

      }

      return (
            <div className=""><p>Message</p>

                  <button type="button" onClick={() => logoutFns()} className="cursor-pointer">Logout</button>
            </div>

      )
}

export default Message