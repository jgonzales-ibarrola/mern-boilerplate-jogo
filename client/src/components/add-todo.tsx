import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TTodo } from "@/types";
import { PlusCircleIcon } from "lucide-react";
import { useCreateTodoMutation, useGetTodosQuery } from "@/services/todos";

const AddTodo = () => {
	const [newTask, setNewTask] = useState<TTodo>({
		task: "",
		isDone: false,
	});

	const { refetch } = useGetTodosQuery();
	const [createTodo] = useCreateTodoMutation();

	const taskInputRef = useRef<HTMLInputElement>(null);

	const handleClick = async (e: React.FormEvent) => {
		e.preventDefault();

		await createTodo(newTask).then(() => refetch());

		setNewTask({
			task: "",
			isDone: false,
		});

		taskInputRef.current?.focus();
	};

	return (
		<form onSubmit={(e) => handleClick(e)}>
			<Input
				type="text"
				placeholder="Clean my room..."
				ref={taskInputRef}
				value={newTask.task}
				onChange={(e) =>
					setNewTask((prev) => ({ ...prev, task: e.target.value }))
				}
			/>
			<Button type="submit">
				<PlusCircleIcon />
				Add
			</Button>
		</form>
	);
};

export default AddTodo;
