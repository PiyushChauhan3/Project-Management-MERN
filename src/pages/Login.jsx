import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useSelector} from "react-redux";


const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  if (isLoggedIn === true) {
    navigate("/");
  }

  const [Data, setData] = useState({
    username: "",
    password: ""
  });
  const history = useNavigate();
  const dispatch = useDispatch();
   
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:2000/api/v1/login",
          Data
        );
        setData({
          username: "",
          password: ""
        })
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };



  return (
    <div className='h-[98vh] flex items-center justify-center'>
    <div className='p-4 w-2/6 rounded bg-gray-800'>
    <h2 className='w-full flex items-center justify-center font-semibold text-2xl p-4' >Login</h2>
    <input 
    type="text"
    placeholder="Username"
    className="w-full p-2 mb-4 rounded border border-gray-600 bg-gray-600"
    name='username'
    value={Data.username
    }
    onChange={change}
    />
    <input
    type="password"
    placeholder="Password"
    className="w-full p-2 mb-4 rounded border border-gray-600 bg-gray-600"
    name='password'
    value={Data.password}
    onChange={change}
    />
    <p className='flex justify-center p-2'>Don't Have Account? <Link to={'/signup'} className='text-blue-500'>Sign Up</Link></p>
    <button
    className="w-full p-2 rounded bg-blue-500 hover:bg-blue-700 text-white
    " onClick={submit}>
        Login
    </button>

    </div>
</div>
  )
}

export default Login