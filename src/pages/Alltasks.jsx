import React, { useState, useEffect } from 'react'
import Cards from '../components/Home/Cards'
import { IoMdAddCircleOutline } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from "axios";


const Alltasks = () => {
  const [InputDiv ,setInputDiv] = useState('hidden');
  const [Data, setData] = useState([]);
  const [updatedData, setupdatedData] = useState({
    id:"",
    title: "",
    description: "",
  });

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
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token")
    )
    {
      fetch();
      }
  });
  return (
   <>
     <div>
      <div className=' w-full flex justify-end px-4 py-2 '>
        <button onClick={() => setInputDiv("fixed")}>
        <IoMdAddCircleOutline  className='text-3xl font-semibold bg-gray-500 rounded-md hover:bg-blue-300 transition-all'/>
        </button>
      </div>
      {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setData={setData} setupdatedData={setupdatedData}/>}
    </div>
    <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setupdatedData={setupdatedData} />
   </>
  )
}

export default Alltasks;