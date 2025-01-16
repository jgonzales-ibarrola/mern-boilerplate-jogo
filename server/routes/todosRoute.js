const express = require('express')

const {fetchTodos, fetchTodo, createTodo, updateTodo, resetTodos} = require('../controllers/todosController')

const router = express.Router();

router.get('/', fetchTodos)

router.get('/:id', fetchTodo)

router.post('/create', createTodo)

router.patch('/:id', updateTodo)

router.delete('/', resetTodos)

module.exports = router;