import {gql} from "graphql-request";

export const LOGIN = gql`
    mutation login($input: LoginInput!){
      login(input: $input) {
        user {
          _id
          name
          email
        },
        accessToken,
        refreshToken
      }
    }
`

export const LOGOUT = gql`
    mutation {
      logout
    }
`

export const REGISTER = gql`
    mutation createUser($input: CreateUserInput!){
      createUser(input: $input) {
        user {
          _id
          name
          email
        },
        accessToken,
        refreshToken
      }
    }
`