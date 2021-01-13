import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../resolvers/categories.resolvers";
import { CategoryOutputType } from "../types/categories.output";
import {
  CategoryInputType,
  CategoryUpdateInputType,
} from "../types/categories.input";
import { SuccessType, FindByIdInputType } from "../../../commons/Types/types";
const CategoryMutation = {
  createCategory: {
    description: "For creating a new category",
    type: CategoryOutputType,
    args: CategoryInputType,
    resolve: createCategory,
  },
  updateCategory: {
    description: "For updating a category",
    type: SuccessType,
    args: CategoryUpdateInputType,
    resolve: updateCategory,
  },
  deleteCategory: {
    description: "For updating a category",
    type: SuccessType,
    args: FindByIdInputType,
    resolve: deleteCategory,
  },
};
export default CategoryMutation;
