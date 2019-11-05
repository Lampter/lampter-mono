import { ApolloServer, gql } from "apollo-server";
import { GraphQLScalarType, Kind } from "graphql";

const typeDef = gql`
  type Query {
    _: Boolean!
  }
  type Mutation {
    _: Boolean!
  }
  type PageInfo {
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
    page: Int!
    offset: Int!
    limit: Int!
    count: Int!
  }
  scalar Date
`;

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

const server = new ApolloServer({
  typeDefs: [typeDef],
  resolvers: [resolvers]
});

export default server;
