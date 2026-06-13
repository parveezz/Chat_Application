import Sidebar from "../components/Sidebar"


const Dashbaord = () => {
      return (
            <section className="w-full h-screen flex items-center ">
                  <div className="bg-amber-800 h-screen w-1/4">
                        <Sidebar />
                  </div>
                  <div className="bg-green-800 h-screen w-3/4">2</div>
            </section>
      )
}

export default Dashbaord