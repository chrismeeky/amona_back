import {
  findAllCategories,
  findOneCategory,
} from "../resolvers/categories.resolvers";
import {
  CategoryOutputListType,
  CategoryOutputType,
} from "../types/categories.output";
import { FindByIdInputType } from "../../../commons/Types/types";

const CategoriesQuery = {
  categories: {
    type: CategoryOutputListType,
    description: "For getting all categories",
    resolve: findAllCategories,
  },
  category: {
    type: CategoryOutputType,
    args: FindByIdInputType,
    description: "For getting one category",
    resolve: findOneCategory,
  },
};
export default CategoriesQuery;
