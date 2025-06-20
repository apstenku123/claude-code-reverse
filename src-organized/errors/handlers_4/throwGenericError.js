/**
 * Throws a generic error. This function is typically used as a placeholder or to indicate that a certain code path should not be executed.
 *
 * @throws {Error} Always throws a generic error with no message.
 */
function throwGenericError() {
  // Always throw a generic error when this function is called
  throw new Error();
}

module.exports = throwGenericError;