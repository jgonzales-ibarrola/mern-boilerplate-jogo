const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const todosSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true })

const Todo = mongoose.model('Todo', todosSchema)

module.exports = Todo