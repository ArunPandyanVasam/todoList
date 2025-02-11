const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false }
});

const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;





/*const mongoose = require('mongoose') // imprt mongodatabase

const TodoSchema = new mongoose.Schema({
    task: String
}); // Schema

const TodoModel = mongoose.model("todos", TodoSchema); // name of the collection and schema
module.exports = TodoModel; // export*/
