import { TTodo } from "@/types";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Edit2Icon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { useGetTodosQuery, useUpdateTodoMutation } from "@/services/todos";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilteredTodos } from "@/features/todosSlice";
import { Checkbox } from "./ui/checkbox";

const Todo = ({ todo }: { todo: TTodo }) => {
	const [open, setOpen] = useState(false);
	const [currTask, setCurrTask] = useState<TTodo>({
		_id: "",
		task: "",
		isDone: undefined,
	});

	const dispatch = useAppDispatch();
	const filteredTodos = useAppSelector((state) => state.todos.filteredTodos);
	const { refetch } = useGetTodosQuery();
	const [updateTodo] = useUpdateTodoMutation();

	const handleEditBtn = (todo: TTodo) => {
		const { _id, task, isDone } = todo;

		const currTask = {
			_id,
			task,
			isDone,
		};

		setCurrTask(currTask);

		setOpen(true);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const updatedTodos = filteredTodos.map((post) =>
				post._id === currTask._id ? { ...post, ...currTask } : post
			);

			dispatch(setFilteredTodos(updatedTodos));

			await updateTodo({
				_id: currTask._id,
				task: currTask.task,
				isDone: currTask.isDone,
			}).unwrap();

			await refetch();
		} catch (error) {
			console.error("Failed to edit a todo, " + error);
		}
	};

	console.log("currTask", currTask);

	return (
		<Card>
			<CardContent>
				<h3 className="text-2xl font-semibold">{todo.task}</h3>
			</CardContent>
			<CardFooter>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger>
						<Button
							type="button"
							onClick={() => handleEditBtn(todo)}
						>
							<Edit2Icon />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								This modification can't be undone, are you sure?
							</DialogTitle>
							<DialogDescription>
								This will be updated in our DB, please make sure
								the data is correct.
							</DialogDescription>
						</DialogHeader>

						<form onSubmit={handleSubmit}>
							<div>
								<Label>Task</Label>
								<Input
									placeholder="Your Task Here..."
									value={currTask.task}
									onChange={(e) =>
										setCurrTask((prev) => ({
											...prev,
											task: e.target.value,
										}))
									}
								/>
							</div>
							<div className="flex items-center gap-4 mt-6">
								<Label>Done?</Label>
								<Checkbox
									checked={currTask.isDone}
									onCheckedChange={() =>
										setCurrTask((prev) => ({
											...prev,
											isDone: !currTask.isDone,
										}))
									}
								/>
							</div>

							<div className="flex gap-2 mt-6">
								<Button
									type="button"
									variant={"outline"}
									onClick={() => setOpen(false)}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									onClick={() => setOpen(false)}
								>
									Save
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	);
};

export default Todo;
