import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import { RolesType } from "../../Roles/types/roles.output";
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    role: { type: RolesType },
    success: { type: GraphQLBoolean },
    status: { type: GraphQLInt },
  }),
});

const Login = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    _id: { type: GraphQLID },
    token: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    status: { type: GraphQLInt },
    role: { type: RolesType },
  }),
});

export { UserType, Login };
