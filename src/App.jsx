
import AppRoute from "./routes/AppRoute"
import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <>
      <div className="font-sans">
        <Toaster />
        <AppRoute />
      </div>
    </>
  )
}

export default App