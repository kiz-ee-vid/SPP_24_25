import {gql} from "graphql-request";

export const GET_TODOS = gql`
    query showTodos($input: TodosRequestInput!) {
        showTodos(input: $input) {
            count,
            todos {
                todoId
                description
                deadline
                completed
                filepath
            }
        }
    }
`