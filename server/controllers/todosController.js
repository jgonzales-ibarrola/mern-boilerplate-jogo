const mongoose = require("mongoose");
const Todo = require("../models/todosModel");

const fetchTodos = async (req, res) => {
	try {
		const todos = await Todo.find().sort({ createdAt: -1 });

		return res.json(todos);
	} catch (error) {
		console.log("Failed to fetch todos", error.message);

		return res.status(404).json({
			error: "Failed to fetch todos " + error.message,
		});
	}
};

const fetchTodo = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("Failed to fetch a todo, INVALID ID!");
		return res.status(404).json({
			error: "Failed to fetch a todo, INVALID ID!" + error.message,
		});
	}

	try {
		const todo = await Todo.findById(id);

		if (!todo) {
			console.log("Failed to fetch a todo, TODO NOT FOUND!");
			return res.status(404).json({
				error: "Failed to fetch a todo, TODO NOT FOUND!" + error.message,
			});
		}

		res.json(todo);
	} catch (error) {
		console.log("Failed to fetch a todo");
		return res.status(404).json({
			error: "Failed to fetch a todo " + error.message,
		});
	}
};

const createTodo =  async (req, res) => {
	const { task, isDone } = req.body;

	const newTodo = {
		task,
		isDone
	}

	try {
		const todo = await Todo.create(newTodo)

		res.json(todo);
	} catch (error) {
		console.log("Failed to create a todo");
		return res.status(404).json({
			error: "Failed to create a todo " + error.message,
		});
	}
}

const updateTodo = async (req, res) => {
	const { id } = req.params;
	const { task, isDone } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("Failed to update a todo, INVALID ID!");
		return res.status(404).json({
			error: "Failed to fetch a todo, INVALID ID!" + error.message,
		});
	}

	const updatedTodo = {
		task,
		isDone
	}

	try {
		const todo = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true })

		res.json(todo)
	} catch (error) {
		console.log("Failed to update a todo");
		return res.status(404).json({
			error: "Failed to update a todo " + error.message,
		});
	}
}

const resetTodos = async (req, res) => {
	try {
		const todo = await Todo.deleteMany();

		res.json(todo);
	} catch (error) {
		console.log("Failed to delete all todo");
		return res.status(404).json({
			error: "Failed to delete all todo " + error.message,
		});
	}
}

module.exports = {
	fetchTodos,
	fetchTodo,
	createTodo,
	updateTodo,
	resetTodos
};
