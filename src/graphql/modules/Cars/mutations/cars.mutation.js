import { signUp } from "../resolvers/users.resolvers";
import { CarInputType } from "../types/cars.input";
import { CarOutputType } from "../types/cars.output";
const CarMutation = {
  createCar: {
    description: "For creating a new car",
    type: CarOutputType,
    args: CarInputType,
    resolve: signUp,
  },
};
export default CarMutation;
