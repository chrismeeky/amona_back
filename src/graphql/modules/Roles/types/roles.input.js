import { GraphQLString, GraphQLList } from "graphql";
const RolesInput = {
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  permissions: { type: GraphQLList(GraphQLString) },
};

export { RolesInput };
