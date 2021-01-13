import { Authentication } from "../utils";

/**
 * Class representing the Authentication methods
 * @class Authorization
 * @description Authenticate protected routes
 */
class Authorization {
  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to invalid token or no token in the request
   */
  static async checkToken(req, res, next) {
    const token =
      req.headers["x-access-token"] || req.query.token || req.body.token;
    if (!token) {
      req.decoded = {
        success: false,
        message: "No token was found",
      };
      return next();
    }
    const verifiedToken = await Authentication.verifyToken(token);
    if (!verifiedToken.success) {
      req.decoded = {
        success: false,
        message: verifiedToken.message,
      };
      return next();
    }
    req.decoded = verifiedToken;
    next();
  }

  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to unauthorized user
   */
  static async confirmUser(req, res, next) {
    if (req.decoded.id !== req.body.id) {
      return HelperMethods.clientError(
        res,
        "You can only update your profile",
        400
      );
    }
    next();
  }

  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to unauthorized user
   */
  static async confirmRole(req, res, next) {
    if (req.decoded.role !== "Manager") {
      return HelperMethods.clientError(
        res,
        "Only managers can perform this action",
        401
      );
    }
    next();
  }

  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to unauthorized user
   */
  static async confirmAdmin(req, res, next) {
    if (req.decoded.role !== "Travel Administrator") {
      return HelperMethods.clientError(
        res,
        "Only Travel Administrators can perform this action",
        401
      );
    }
    next();
  }
}

export default Authorization;
