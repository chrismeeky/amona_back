import { signUp, updateUser, assignRole } from "../resolvers/users.resolvers";
import {
  RegistrationInput,
  UpdateUserInput,
  AssignRoleType,
} from "../types/users.input";
import { UserType } from "../types/users.output";
const UserMutations = {
  signUp: {
    description: "For creating a new user",
    type: UserType,
    args: RegistrationInput,
    resolve: signUp,
  },
  updateUser: {
    type: UserType,
    description: "For updating user information",
    args: UpdateUserInput,
    resolve: updateUser,
  },
  assignRole: {
    type: UserType,
    description: "For assigning roles to users",
    args: AssignRoleType,
    resolve: assignRole,
  },
};
export default UserMutations;
