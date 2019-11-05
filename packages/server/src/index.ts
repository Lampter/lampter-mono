import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { db } from "./db";
import { buildSchema } from "type-graphql";

const PORT = process.env.PORT || 5000;
const GQLPATH = "/graphql";

const main = async () => {
  // Uncomment force: true to reset DB
  await db.sync({
    force: true
  });

  const schema = await buildSchema({
    // authChecker: customAuthChecker,
    emitSchemaFile: path.resolve(__dirname, "..", "schema", "schema.gql"),
    // .js instead of .ts because ts will transpile into js
    resolvers: [`${__dirname}/resolvers/*.resolver.js`]
  });

  const app = express();

  const server = new ApolloServer({
    context: ({ req }) => {
      const context = {
        req,
        db
        // user: req.user // `req.user` comes from `express-jwt`
      };
      return context;
    },
    schema,
    introspection: true,
    playground: true
  });

  // app.use(
  //   GQLPATH,
  //   expressJwt({
  //     credentialsRequired: false,
  //     secret: process.env.CRYPTO_KEY!
  //   })
  // );

  server.applyMiddleware({ app, path: GQLPATH });

  app.use(
    cors({
      // Add whitelist here
      // origin: ["http://localhost:8080", "http://localhost:3000"]
    })
  );

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  // tslint:disable-next-line: no-console
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
};

main();
