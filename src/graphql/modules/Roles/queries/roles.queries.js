import { findAllRoles } from "../resolvers/roles.resolvers";
import { RolesType } from "../types/roles.output";
import { GraphQLList } from "graphql";

const RolesQueries = {
  roles: {
    type:GraphQLList(RolesType),
    description: "For getting all roles",
    resolve: findAllRoles,
  },
 
};
export default RolesQueries;
