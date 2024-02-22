// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({ 
        baseUrl: `http://localhost:3001/` 
    }),
    //A root tagTypes field in the API slice object, declaring an array of string tag names for data types such as Todo
    tagTypes: ['Todos'],
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
      // The `getTodos` endpoint is a "query" operation that returns data
      getTodos: builder.query({
        // The URL for the request is 'http://localhost:3001/todos'
        query: () => '/todos',
        providesTags: ['Todos'] // A providesTags array in query endpoints, listing a set of tags describing the data in that query
      }),
      addTodo: builder.mutation({
        query: newTodo => ({
          url: '/todos',
          method: 'POST',
          // Include the entire post object as the body of the request
          body: newTodo
        }),
        invalidatesTags: ['Todos'] // An invalidatesTags array in mutation endpoints, listing a set of tags that are invalidated every time that mutation runs
      }),
      deleteTodo: builder.mutation({
        query: id => ({
            url: `todos/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Todos']
      }),
      toggleCompleteTodo: builder.mutation({
        query: (todo) => ({
          url: `todos/${todo.id}`,
          method: 'PATCH',
          body: todo
        }),
        invalidatesTags: ['Todos']
      })
    })
  })
  
  // Export the auto-generated hook for the `getPosts` query endpoint
  export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useToggleCompleteTodoMutation } = apiSlice;