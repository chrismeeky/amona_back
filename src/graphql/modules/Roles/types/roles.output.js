import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";
const RolesType = new GraphQLObjectType({
  name: "Roles",
  description: "Specifications for a role",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    permissions: { type: GraphQLList(GraphQLString) },
  }),
});

export { RolesType };
