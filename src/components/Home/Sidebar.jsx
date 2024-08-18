import React from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icons: <CgNotes />,
      link: "/",
    },
    {
      title: "Important Tasks",
      icons: <MdLabelImportant />,
      link: "/importanttasks",
    },
    {
      title: "Completed Tasks",
      icons: <MdCheckCircleOutline />,
      link: "/completedtasks",
    },
    {
      title: "Incompleted Tasks",
      icons: <MdPending />,
      link: "/pendingtasks",
    },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:2000/api/v2/get-all-task",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="my-1 text-gray-600">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link} 
            key={i}
            className="my-2 flex items-center gap-2 hover:bg-gray-600 p-2 rounded-xl transition-all duration-300"
          >
            {items.icons} {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          onClick={logout}
          className="bg-blue-950 hover:bg-blue-500 transition-all text-white font-bold p-2 w-full rounded"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
