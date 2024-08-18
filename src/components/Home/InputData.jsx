import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv, updatedData, setupdatedData }) => {
  const [Data, setData] = useState({ title: "", description: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  useEffect(() => {
    setData({
      title: updatedData.title,
      description: updatedData.description,
    });
  }, [updatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("Please fill all fields");
    } else {
      await axios.post("http://localhost:2000/api/v2/create-task", Data, {
        headers,
      });
      setInputDiv("hidden");
    }
  };

  const UpdateProj = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("Please fill all fields");
    } else {
      await axios.put(`http://localhost:2000/api/v2/update-task/${updatedData.id}`, Data, {
        headers,
      });
      setupdatedData(Data);
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-70 h-screen w-full`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 rounded border p-4 border-gray-50 ">
          <div className="flex justify-end font-semibold text-2xl p-2">
            <button
              onClick={() => {
                setInputDiv("hidden");
                setData({ title: "", description: "" });
                setupdatedData({
                  id: "",
                  title: "",
                  description: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-500"
            value={Data.title}
            onChange={change}
          ></input>
          <textarea
            name="description"
            cols={30}
            rows={10}
            placeholder="Description....."
            className="px-3 py-2 rounded w-full bg-gray-500 my-3"
            value={Data.description}
            onChange={change}
          ></textarea>
          {updatedData.id === "" ? (
            <button
              className=" w-full px-3 py-2 bg-blue-400 rounded-md hover:bg-gray-600 my-1 font-semibold"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className=" w-full px-3 py-2 bg-blue-400 rounded-md hover:bg-gray-600 my-1 font-semibold"
              onClick={UpdateProj}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
