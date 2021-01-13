import { GraphQLObjectType } from "graphql";
import UserQueries from "../modules/Users/queries/users.queries";
import RolesQueries from "../modules/Roles/queries/roles.queries";
import CategoriesQueries from "../modules/Categories/queries/categories.queries"
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Handles all queries",
  fields: () => ({
    ...UserQueries,
    ...RolesQueries,
    ...CategoriesQueries
  }),
});

export default RootQuery;
