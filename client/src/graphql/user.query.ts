import {gql} from "graphql-request";

export const CHECK_AUTH = gql`
    query {
      me {
        _id
        name
        email
      }
    }
`