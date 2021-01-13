import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/users.model";
import HelperMethods from "../../../../utils/helperMethod";

const signUp = async (parent, args) => {
  const { email, password, firstName, lastName } = args;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Error(await HelperMethods.clientError("User already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const createdUser = await newUser.save();
    delete createdUser._doc.password;
    return await HelperMethods.requestSuccessful(createdUser._doc);
  } catch (error) {
    return await HelperMethods.serverError(error.message);
  }
};
const user = async (parent, args) => {
  const { password, email } = args;
  try {
    const userExists = await User.findOne({ email }).populate("role").exec();
    if (!userExists) {
      return new Error(
        await HelperMethods.clientError("Login credentials is wrong")
      );
    }
    const passwordIsCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!passwordIsCorrect)
      return new Error(
        await HelperMethods.clientError("Login credentials is wrong", 401)
      );
    const user = { ...userExists._doc };
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);

    return HelperMethods.requestSuccessful(
      {
        ...user,
        token,
      },
      200
    );
  } catch (error) {
    throw error;
  }
};
const updateUser = async (parent, args) => {
  const { _id, password } = args;
  let user = args;
  try {
    const userExists = await User.findOne({ _id });
    if (!userExists) {
      return new Error(await HelperMethods.clientError("User does not exist"));
    }
    delete user._id;

    const updatedUser = await User.updateOne({ _id, $set: user });
    if (updatedUser) {
      const user = await User.findOne({ _id }).populate("role");
      delete user._doc.password;
      return await HelperMethods.requestSuccessful(user._doc);
    }
  } catch (error) {
    return await HelperMethods.serverError(error.message);
  }
};
const assignRole = async (parent, args) => {
  const { userId, rolesId } = args;
  try {
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) {
      return new Error(await HelperMethods.clientError("User does not exist"));
    }

    const assignedRole = await User.updateOne({
      _id: userId,
      $set: { role: rolesId },
    });
    if (assignedRole) {
      const user = await User.findOne({ _id: userId }).populate("role");
      delete user._doc.password;
      return await HelperMethods.requestSuccessful(user._doc);
    }
  } catch (error) {
    throw error;
  }
};
export { signUp, user, updateUser, assignRole };
