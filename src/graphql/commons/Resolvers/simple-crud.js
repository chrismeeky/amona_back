import HelperMethods from "../../../utils/helperMethod";
import { constructor } from "sendgrid";
/**
 * Class representing the business controller
 * @class CrudController
 * @description business controller
 */
class CrudController {
  constructor(model, modelName, unique = {}, criteria = {}, authorize = {}) {
    this.Model = model;
    this.modelName = modelName;
    this.unique = unique;
    this.criteria = criteria;
    this.authorize = authorize;
  }

  checkCriteria = async (payload) => {
    const criteria = Object.keys(this.criteria).length
      ? this.criteria
      : { _id: payload._id };
    return criteria;
  };
  checkUnique = async () => {
    const unique = { ...this.unique };
    delete unique.customMessage;
    if (Object.keys(this.unique).length) {
      const isExist = await this.Model.findOne(unique);
      if (isExist) {
        const errorMessage = await HelperMethods.clientError(
          this.unique.customMessage.toString().trim()
        );
        return {
          isExist: true,
          errorMessage,
        };
      }
      return { isExist: false };
    }
  };

  /**
   * Creates a new data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  create = async (payload) => {
    try {
      const checkUnique = await this.checkUnique();
      if (checkUnique.isExist) return new Error(checkUnique.errorMessage);
      const newData = new this.Model(payload);
      const savedData = await newData.save();
      if (savedData) {
        return HelperMethods.requestSuccessful(savedData._doc);
      }
      return HelperMethods.clientError(
        `There was a problem creating this ${this.modelName}`
      );
    } catch (error) {
      return new Error(await HelperMethods.serverError(error.message));
    }
  };

  /**
   * Find all data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  findAll = async () => {
    try {
      const data = await this.Model.find(this.criteria);
      console.log("data", data);
      if (data && data.length) {
        return HelperMethods.requestSuccessful({ [this.modelName]: data });
      }
      return HelperMethods.clientError(`No ${this.modelName}s was found`);
    } catch (error) {
      return HelperMethods.serverError(error.message);
    }
  };
  /**
   * Find one
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  findOne = async (payload) => {
    const findOneCriteria = await this.checkCriteria(payload);
    try {
      const data = await this.Model.findOne(findOneCriteria);
      if (data) {
        return HelperMethods.requestSuccessful(data._doc);
      }
      return HelperMethods.clientError(`${this.modelName} does not exist`);
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  };

  /**
   * Update a data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  update = async (payload) => {
    if (this.authorize.check) {
      if (!this.authorize.success) {
        return new Error(
          await HelperMethods.clientError(
            `You are not authorized to perfom this action`
          )
        );
      }
    }
    const updateCriteria = await this.checkCriteria(payload);
    try {
      const checkUnique = await this.checkUnique();
      if (checkUnique.isExist) return new Error(checkUnique.errorMessage);
      const data = await this.Model.findOne(updateCriteria);
      if (!data) {
        return new Error(
          await HelperMethods.clientError(`${this.modelName} does not exist`)
        );
      }
      const updatedData = await this.Model.updateOne(updateCriteria, {
        $set: payload,
      });
      if (updatedData) {
        return await HelperMethods.requestSuccessful(
          `${this.modelName} successfully updated`
        );
      }
      return new Error(
        HelperMethods.clientError(`${this.modelName} could not be updated`)
      );
    } catch (error) {
      return await HelperMethods.serverError(error.message);
    }
  };

  /**
   * Delete data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  deleteOne = async (payload) => {
    if (this.authorize.check) {
      console.log("authorize", this.authorize);
      if (
        !this.authorize.role ||
        this.authorize.role.title !== "Admin" ||
        !this.authorize.success
      ) {
        return new Error(
          await HelperMethods.clientError(
            `You are not authorized to perfom this action`
          )
        );
      }
    }
    const deleteCriteria = await this.checkCriteria(payload);
    try {
      const data = await this.Model.findOne(deleteCriteria);
      if (!data) {
        return new Error(
          await HelperMethods.clientError(`${this.modelName} does not exist`)
        );
      }
      const deletedData = await this.Model.deleteOne(deleteCriteria);
      if (deletedData) {
        return await HelperMethods.requestSuccessful(
          `${this.modelName} successfully deleted`
        );
      }
      return new Error(
        await HelperMethods.clientError(
          `${this.modelName} could not be deleted`
        )
      );
    } catch (error) {
      return await HelperMethods.serverError(error.message);
    }
  };
}

export default CrudController;
