import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/cars.model";

const signUp = async (parent, args) => {
  console.log(args)
  const { email, password, firstName, lastName } = args;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
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
    return createdUser;
  } catch (error) {
    throw error;
  }
};
const user = async (parent, args) => {
  const { password, email } = args;
  try {
    const userExists = await User.findOne({ email });

    if (!userExists) {
      throw new Error("Email does not exist");
    }
    const passwordIsCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!passwordIsCorrect) throw new Error("Password is incorrect");

    const token = jwt.sign(
      {
        _id: userExists._id,
        email: userExists.email,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
      },
      process.env.JWT_SECRET
    );
    return {
      _id: (await userExists)._id,
      token,
    };
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
      throw new Error("User does not exist");
    }
    delete user._id;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }
    const updatedUser = await User.updateOne({ _id, $set: user });
    if (updatedUser) {
      const user = await User.findOne({ _id }).populate("role");
      delete user._doc.password;
      return user;
    }
    return updateUser;
  } catch (error) {
    throw error;
  }
};
const assignRole = async (parent, args) => {
  const { userId, rolesId } = args;
  try {
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) {
      throw new Error("User does not exist");
    }

    const assignedRole = await User.updateOne({
      _id: userId,
      $set: { role: rolesId },
    });
    if (assignedRole) {
      const user = await User.findOne({ _id: userId }).populate("role");
      delete user._doc.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
};
export { signUp, user, updateUser, assignRole };
