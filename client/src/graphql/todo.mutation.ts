import {gql} from "graphql-request";

export const CREATE_TODO = gql`
    mutation createTodo($input: CreateTodoInput!, $file: Upload){
      createTodo(input: $input, file: $file) {
        todoId
        description
        deadline
        completed
        filepath
      }
    }
`

export const DELETE_TODO = gql`
    mutation deleteTodo($input: DeleteTodoInput!){
      deleteTodo(input: $input)
    }
`

export const UPDATE_TODO = gql`
    mutation updateTodo($input: UpdateTodoInput!, $file: Upload){
      updateTodo(input: $input, file: $file) {
        todoId
        description
        deadline
        completed
        filepath
      }
    }
`