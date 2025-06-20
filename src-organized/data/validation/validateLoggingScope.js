/**
 * Validates the provided logging scope against allowed options.
 *
 * If no scope is provided, defaults to 'local'.
 * Throws an error if the provided scope is not valid.
 *
 * @param {string} [scope] - The logging scope to validate. Optional.
 * @returns {string} The validated logging scope.
 * @throws {Error} If the provided scope is not one of the allowed options.
 */
function validateLoggingScope(scope) {
  // If no scope is provided, default to 'local'
  if (!scope) {
    return "local";
  }

  // Ensure Uy1.options exists and includes the provided scope
  if (!Uy1.options.includes(scope)) {
    throw new Error(
      `Invalid scope: ${scope}. Must be one of: ${Uy1.options.join(", ")}`
    );
  }

  // Return the valid scope
  return scope;
}

module.exports = validateLoggingScope;