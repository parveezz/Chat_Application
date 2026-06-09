

const Navbar = () => {
  const getdata = JSON.parse(localStorage.getItem("User"));
  console.log(getdata)
  return (
    <>
      <div>
        <p>Name : {getdata?.name}</p>
        <p>email : {getdata?.email}</p>

      </div>
      <div></div>
    </>
  )
}

export default Navbar