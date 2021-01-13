import { user } from "../resolvers/users.resolvers";
import { LoginInput } from "../types/cars.input";
import { Login } from "../types/users.output";

const UserQueries = {
  signIn: {
    type: Login,
    description: "For signing in a user and getting token",
    args: LoginInput,
    resolve: user,
  },
};
export default UserQueries;
