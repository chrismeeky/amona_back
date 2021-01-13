import Role from "../model/roles.model";

const createRole = async (parent, args) => {
  const { title, description, permissions } = args;
  try {
    const roleExists = await Role.findOne({ title });
    if (roleExists) {
      throw new Error("Role already exists");
    }
    if (!permissions.length) {
      throw new Error("Include at least 1 permission");
    }
    const newRole = new Role({ title, description, permissions });
    const createdRole = await newRole.save();
    return createdRole;
  } catch (error) {
    throw error;
  }
};
const findAllRoles = async () => {
  try {
    const allRoles = await Role.find({});
    if (!allRoles.length) {
      throw new Error("No roles was found");
    }
    return allRoles;
  } catch (error) {
    throw error;
  }
};
export { createRole, findAllRoles };
