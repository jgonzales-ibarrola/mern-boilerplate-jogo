import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Todo from "./todo";
import { useEffect } from "react";
import { useGetTodosQuery } from "@/services/todos";
import { setFilteredTodos } from "@/features/todosSlice";

const TodoList = () => {
	const dispatch = useAppDispatch();
	const { data: allTodos, isLoading } = useGetTodosQuery();
	const filteredTodos = useAppSelector((state) => state.todos.filteredTodos);

	useEffect(() => {
		dispatch(setFilteredTodos(allTodos || []));
	}, [dispatch, allTodos]);

	return (
		<div>
			{isLoading && <p>Todos Loading...</p>}
			{!isLoading &&
				filteredTodos.map((todo) => {
					return <Todo key={todo._id} todo={todo} />;
				})}
		</div>
	);
};

export default TodoList;
