import { createRole } from "../resolvers/roles.resolvers";
import { RolesType } from "../types/roles.output";
import { RolesInput } from "../types/roles.input";
const AuthMutations = {
  createRole: {
    description: "For creating a new role",
    type: RolesType,
    args: RolesInput,
    resolve: createRole,
  },
};
export default AuthMutations;
