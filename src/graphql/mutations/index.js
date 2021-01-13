import { GraphQLObjectType } from "graphql";
import UserMutations from "../modules/Users/mutations/users.mutation";
import RolesMutations from "../modules/Roles/mutations/roles.mutations";
import CarMutations from "../modules/Cars/mutations/cars.mutation";
import CategoryMutations from "../modules/Categories/mutations/categories.mutations";
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "Handles all the Create Delete and Update operations",
  fields: () => ({
    ...UserMutations,
    ...RolesMutations,
    ...CarMutations,
    ...CategoryMutations,
  }),
});

export default RootMutation;
