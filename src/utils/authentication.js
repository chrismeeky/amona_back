import jwt from "jsonwebtoken";

/**
 * scrambles string data
 * @param {String} token - input string data
 * @returns {String} - scrambled data
 */
const shuffleToken = (token) => token.split("").reverse().join("");

/**
 * Class representing the Authentication methods
 * @class Authentication
 * @description Authentication class methods
 */
class Authentication {
  /**
   * creates a user token
   * @param {object} payload - contains id, role username and hashedPassword
   * @param {integer} expiresIn - Time in seconds
   * @returns {string} - returns a jwt token
   */
  static async getToken(payload, expiresIn = "24h") {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
 
    return token;
  }

  /**
   * verify a token's validity
   * @param {string} token - token input
   * @returns {req} - populate the request with the decrypted content
   */
  static async verifyToken(token) {
    try {
      const isVerified = await jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      return {
        success: true,
        ...isVerified,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default Authentication;
