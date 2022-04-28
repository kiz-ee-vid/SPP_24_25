import { GraphQLClient, gql } from 'graphql-request'

const endpoint = "http://localhost:5000/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'cors',
});

export default graphQLClient;