import "dotenv/config";
import "./config/mongoose";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";

import { GraphQLSchema } from "graphql";
import RootQuery from "./graphql/queries/index";
import RootMutation from "./graphql/mutations/index";

import { Authorization } from "./middlewares";
const app = express();
app.use(bodyParser.json());
app.use(cors());

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
app.use(Authorization.checkToken);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: (error) => {
      return JSON.parse(error.message);
    },
  })
);
app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
