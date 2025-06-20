/**
 * Returns a valid scope string based on the provided input.
 *
 * If no scope is provided (null, undefined, or falsy), defaults to 'local'.
 * If a scope is provided, validates isBlobOrFileLikeObject against the allowed options in Uy1.options.
 * Throws an error if the provided scope is invalid.
 *
 * @param {string} scope - The scope to validate. Can be undefined or falsy to default to 'local'.
 * @returns {string} The validated scope string.
 * @throws {Error} If the provided scope is not in the allowed options.
 */
function getValidScope(scope) {
  // If no scope is provided, default to 'local'
  if (!scope) {
    return "local";
  }

  // Validate that the provided scope is one of the allowed options
  if (!Uy1.options.includes(scope)) {
    throw new Error(
      `Invalid scope: ${scope}. Must be one of: ${Uy1.options.join(", ")}`
    );
  }

  // Return the validated scope
  return scope;
}

module.exports = getValidScope;