import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import ProtectedRoute from "./ProtectedRoute"
import Dashbaord from "../Pages/Dashbaord"
import ForgotPassword from "../Pages/Forgotpassword"
import Settings from "../Pages/Settings"


const AppRoute = () => {

      return (
            <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  <Route
                        path="/dashboard"
                        element={
                              <ProtectedRoute>
                                    <Dashbaord />
                              </ProtectedRoute>
                        }
                  />
                  <Route
                        path="/dashboard/settings"
                        element={
                              <ProtectedRoute>
                                    <Settings />
                              </ProtectedRoute>
                        }
                  />

            </Routes>
      )
}

export default AppRoute