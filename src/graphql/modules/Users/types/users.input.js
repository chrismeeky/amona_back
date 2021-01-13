import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from "graphql";

const RegistrationInput = {
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: GraphQLString },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
};
const LoginInput = {
  email: { type: GraphQLString },
  password: { type: GraphQLString },
};

const UpdateUserInput = {
  _id: { type: GraphQLID },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
};
const AssignRoleType = {
  userId: { type: GraphQLID },
  rolesId: { type: GraphQLID },
};
export { RegistrationInput, LoginInput, UpdateUserInput, AssignRoleType };
