/**
 * Class representing the helper methods
 * @class HelperMethods
 * @description methods used everywhere in the codebase
 */
class HelperMethods {
  /**
   * A method used to send server errors
   * @param {object} res - HTTP response object
   * @param {String} message - The error message you want to set.
   * @returns {object} res - The HTTP response object
   */
  static serverError(message) {
    return JSON.stringify({
      success: false,
      message: message || "Internal server error",
      status: 500,
    });
  }

  /**
   * A method used to send client-side errors
   * @param {object} res - HTTP response object
   * @param {String} message - The error message you want to set.
   * @param {number} status = Status code of the client error
   * @returns {object} res - The HTTP response object
   */
  static async clientError(message, status = 400) {
    return JSON.stringify({
      success: false,
      message,
      status,
    });
  }

  /**
   * A method used to confirm that a request was successful
   * @param {object} res - HTTP response object
   * @param {object} payload - data we want to send to the front-end
   * @param {number} status = Status code of the successful request
   * @returns {object} res - HTTP response object
   */
  static requestSuccessful(payload, status = 200) {
    const data = { success: true, ...payload, status };
    return data;
  }
}

export default HelperMethods;
