import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Alltasks from "./pages/Alltasks";
import Importanttasts from "./pages/Importanttasts";
import Completedtasks from "./pages/Completedtasks";
import Pendingtasks from "./pages/Pendingtasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector, useDispatch} from "react-redux";
import { authActions } from "./store/auth";


const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="bg-black text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/importanttasks" element={<Importanttasts />} />
          <Route path="/completedtasks" element={<Completedtasks />} />
          <Route path="/pendingtasks" element={<Pendingtasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
