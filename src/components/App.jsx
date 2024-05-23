import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import NavBar from "./NavBar";
import AuthRoute from "./AuthRoute/AuthRoute";
import Profile from "./Profile";



function App() {

  const [user, setUser] = useState(null)//null === middelware
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    axios.get("https://664e259dfafad45dfadf3290.mockapi.io/users")
      .then(response => {
        setListUsers(response.data)
      })
  }, [])

  

  return (
    <div>
      <NavBar />
  
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/login" element={<Login listUsers={listUsers} setUser={setUser} />} />
        <Route path="/profile" element={
          <AuthRoute user={user} component={<Profile  listUsers={listUsers}/>} />} />
      </Routes>
      

    </div>
  );
}

export default App;
