import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";


const Cards = ({ home, setInputDiv, data, setData, setupdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
       `http://localhost:2000/api/v2/update-task-complete/${id}`,
        {},
        { headers }
      );
  
      // Log the response to check if the backend is returning the correct data
      console.log("Response from backend:", response.data);
  
      const updatedData = data.map((items) =>
        items._id === id ? { ...items, completed: !items.completed } : items
      );
  
      // Log the updated data to verify the state change
      console.log("Updated data:", updatedData);
  
      setData(updatedData);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleImportantTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:2000/api/v2/update-task-important/${id}`,
        {},
        { headers }
      );
  
      // Log the response to check if the backend is returning the correct data
      console.log("Response from backend:", response.data);
  
      const updatedData = data.map((items) =>
        items._id === id ? { ...items, important: !items.important } : items
      );
  
      // Log the updated data to verify the state change
      console.log("Updated data:", updatedData);
  
      setData(updatedData);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/v2/delete-task/${id}`,
        { headers }
      );
  
      // Log the response to check if the backend is returning the correct data
      console.log("Response from backend:", response.data);
  
      // Update the state by filtering out the deleted task
      const updatedData = data.filter((items) => items._id !== id);
  
      // Log the updated data to verify the state change
      console.log("Updated data after deletion:", updatedData);
  
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async(id, title, description) =>{
    setInputDiv("fixed");
    setupdatedData({
      id: id,
      title: title,
      description: description,
    })
  }
  
  

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items) => (
          <div key={items._id} className="flex flex-col justify-between bg-gray-700 rounded-md p-4">
            <div>
              <h3 className="text-xl font-semibold">
                {items.title}
              </h3>
              <p className="text-gray-400 my-2">{items.description}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.completed ? "bg-green-500" : "bg-red-500"
                } rounded-md p-2 w-3/6`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.completed ? "Completed" : "Incompleted"}
              </button>
              <div className="text-white p-2 w-3/6 text-xl font-semibold flex justify-around">
                <button onClick={()=> handleImportantTask(items._id)} >
                  {items.important === false ? <FaRegHeart /> : <FaHeart className="text-red-500" /> }

                </button>
                {home !== "false" && <button>
                  <FaEdit onClick={()=> handleUpdate(items._id, items.title, items.description)}  />
                </button>}
                <button>
                  <FaTrash  onClick={()=> deleteTask(items._id)} />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col items-center justify-center bg-gray-700 rounded-md p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all"
        >
          <IoMdAddCircleOutline className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
