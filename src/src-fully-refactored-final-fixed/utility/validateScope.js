/**
 * Validates the provided scope value against a list of allowed options.
 *
 * If no scope is provided, returns the default scope ("local").
 * Throws an error if the provided scope is not in the list of allowed options.
 *
 * @param {string} scope - The scope value to validate.
 * @returns {string} The validated scope value, or the default if none is provided.
 * @throws {Error} If the provided scope is not valid.
 */
function validateScope(scope) {
  // Return default scope if none is provided
  if (!scope) {
    return "local";
  }

  // Check if the provided scope is in the allowed options
  if (!Uy1.options.includes(scope)) {
    // Throw an error if the scope is invalid
    throw new Error(
      `Invalid scope: ${scope}. Must be one of: ${Uy1.options.join(", ")}`
    );
  }

  // Return the validated scope
  return scope;
}

module.exports = validateScope;