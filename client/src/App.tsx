import AddTodo from "./components/add-todo"
import TodoList from "./components/todo-list"

function App() {


  return (
    <>
      <div className="container my-12">
        <h1 className="text-4xl font-bold">
          Todo List App
        </h1>

        <AddTodo />

        <TodoList />
      </div>
    </>
  )
}

export default App
