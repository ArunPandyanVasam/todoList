require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Using environment variable)
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Get all tasks
app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task cannot be empty" });

    const newTodo = await TodoModel.create({ task });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TodoModel.findByIdAndDelete(id);

    if (!deletedTask) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) return res.status(400).json({ error: "Task cannot be empty" });

    const updatedTask = await TodoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


/*const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const TodoModel = require('./Models/Todo') // import todo

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/test') // test is name of my database

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
});


app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});*/
