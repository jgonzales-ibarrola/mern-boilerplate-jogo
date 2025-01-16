import { TTodo } from "@/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodosState {
	filteredTodos: TTodo[];
}

const initialState: TodosState = {
	filteredTodos: [],
};

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		setFilteredTodos: (state, action: PayloadAction<TTodo[]>) => {
			state.filteredTodos = action.payload;
		},

		addTodo: (state, action: PayloadAction<TTodo>) => {
			state.filteredTodos = [...state.filteredTodos, action.payload];
		},

		deleteTodo: (state, action: PayloadAction<TTodo>) => {
			state.filteredTodos.filter(
				(todo) => todo._id !== action.payload._id
			);
		},

		updateTodo: (state, action: PayloadAction<TTodo>) => {
			state.filteredTodos = state.filteredTodos.map((todo) =>
				todo._id === action.payload._id
					? { ...todo, ...action.payload }
					: todo
			);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setFilteredTodos, addTodo, deleteTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;
