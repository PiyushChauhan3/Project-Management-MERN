const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("../routes/auth");

// createtask
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.headers;
    const newTask = new Task({ title: title, description: description });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findByIdAndUpdate(id, {
      $push: {
        tasks: taskId._id,
      },
    });
    res.status(200).json({ message: "Task Created!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error!" });
  }
});

//get all task
router.get("/get-all-task", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error!" });
  }
});

//delete task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error!" });
  }
});

//update task
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    res.status(200).json({ message: "Task Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error!" });
  }
});

//update- importatnt task
router.put(
  "/update-task-important/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const taskData = await Task.findById(id);
      const ImpTask = taskData.important;
      await Task.findByIdAndUpdate(id, {
        important: !ImpTask,
      });
      res.status(200).json({ message: "Task Updated Successfully!" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal Server Error!" });
    }
  }
);

//update-complte task
router.put("/update-task-complete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const CompletedTask = taskData.completed;
    await Task.findByIdAndUpdate(id, {
      completed: !CompletedTask,
    });
    res.status(200).json({ message: "Task Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error!" });
  }
});


//get important task 
router.get("/get-important-task", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
          path: "tasks",
          match: { important: true },
          options: { sort: { createdAt: -1 } },
        });
        const ImpTaskData = Data.tasks;
        res.status(200).json({ data: ImpTaskData });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error!" });
      }
}); 

//get Completed task 
router.get("/get-completed-task", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
          path: "tasks",
          match: { completed: true },
          options: { sort: { createdAt: -1 } },
        });
        const completedTaskData = Data.tasks;
        res.status(200).json({ data: completedTaskData });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error!" });
      }
});    


//get In-Completed task 
router.get("/get-incompleted-task", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
          path: "tasks",
          match: { completed: false },
          options: { sort: { createdAt: -1 } },
        });
        const IncompletedTaskData = Data.tasks;
        res.status(200).json({ data: IncompletedTaskData });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error!" });
      }
});    


module.exports = router;
