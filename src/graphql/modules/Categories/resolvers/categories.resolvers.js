import Category from "../model/categories.model";
import SimpleCrud from "../../../commons/Resolvers/simple-crud";

const createCategory = async (parent, args, req) => {
  const simpleCrud = new SimpleCrud(Category, "category", {
    title: args.title,
    customMessage: "category with the title already exists",
  });
  return await simpleCrud.create(args);
};


const findAllCategories = async () => {
  const simpleCrud = new SimpleCrud(Category, "categories");
  return await simpleCrud.findAll();
};

const findOneCategory = async (parent, args) => {
  const simpleCrud = new SimpleCrud(Category, "category");
  return await simpleCrud.findOne(args);
};

const updateCategory = async (parent, args, req) => {
  const simpleCrud = new SimpleCrud(
    Category,
    "category",
    {
      title: args.title,
      customMessage: "category with the title already exists",
    },
    {},
    { check: true, ...req.decoded }
  );
  return await simpleCrud.update(args);
};

const deleteCategory = async (parent, args, req) => {
  const simpleCrud = new SimpleCrud(
    Category,
    "category",
    {},
    {},
    { check: true, ...req.decoded }
  );
  return await simpleCrud.deleteOne(args);
};
export {
  createCategory,
  findAllCategories,
  findOneCategory,
  updateCategory,
  deleteCategory,
};
