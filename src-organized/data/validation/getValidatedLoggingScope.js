/**
 * Returns a validated logging scope string.
 *
 * If no scope is provided, defaults to 'local'.
 * Throws an error if the provided scope is not in the allowed options.
 *
 * @param {string} [scope] - The desired logging scope. Optional.
 * @returns {string} The validated logging scope.
 * @throws {Error} If the provided scope is invalid.
 */
function getValidatedLoggingScope(scope) {
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

module.exports = getValidatedLoggingScope;