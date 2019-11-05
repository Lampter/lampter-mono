import { gql } from "apollo-server-express";

export const typeDef = gql`
  type User {
    id: Int!
    handle: String!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    users: [User]!
  }
`;
