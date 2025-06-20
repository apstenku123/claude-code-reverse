/**
 * Throws a custom error using the provided error constructor and error data.
 *
 * @param {any} errorData - The data to be passed to the error constructor. This is typically an error message or object.
 * @param {Function} ErrorConstructor - The constructor function (class) for the error to be thrown.
 * @throws {Error} Throws an error created by ErrorConstructor with errorData.
 */
const throwCustomError = (errorData, ErrorConstructor) => {
  // Throw a new error using the provided constructor and data
  throw new ErrorConstructor(errorData);
};

module.exports = throwCustomError;
