import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import ProtectedRoute from "./ProtectedRoute"
import Dashboard from "../Pages/Dashboard"
import ForgotPassword from "../Pages/Forgotpassword"


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
                                    <Dashboard />
                              </ProtectedRoute>
                        }
                  />

            </Routes>
      )
}

export default AppRoute