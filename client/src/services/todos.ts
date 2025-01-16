
// createApi

import { TTodo } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// reducerPath

// baseQuery 
// fetchBaseQuery

// endpoints

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mern-boilerplate-jogo-backend.onrender.com/api"
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<TTodo[], number|void>({
      query: () => "/todos",
    }),
    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos/create",
        method: "POST",
        body: newTodo
      })
    }),
    updateTodo: builder.mutation({
      query: (updatedTodo) => ({
        url: `/todos/${updatedTodo._id}`,
        method: "PATCH",
        body: updatedTodo
      })
    })
  })
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation
} = todosApi;