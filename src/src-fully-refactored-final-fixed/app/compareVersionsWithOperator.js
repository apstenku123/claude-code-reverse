/**
 * Compares two version values using a specified operator.
 * Handles both primitive values and objects with a 'version' property.
 * Delegates to specialized comparison functions for non-strict operators.
 *
 * @param {string|object} leftVersion - The left-hand side version value or object with a 'version' property.
 * @param {string} operator - The comparison operator (e.g., '===', '!==', '>', '>=', '<', '<=', '=', '==', '!=', '').
 * @param {string|object} rightVersion - The right-hand side version value or object with a 'version' property.
 * @param {any} context - Additional context passed to the delegated comparison functions.
 * @returns {boolean} The result of the comparison.
 * @throws {TypeError} If an invalid operator is provided.
 */
function compareVersionsWithOperator(leftVersion, operator, rightVersion, context) {
  switch (operator) {
    case '===':
      // If either side is an object, extract its 'version' property
      if (typeof leftVersion === 'object') leftVersion = leftVersion.version;
      if (typeof rightVersion === 'object') rightVersion = rightVersion.version;
      return leftVersion === rightVersion;
    case '!==':
      if (typeof leftVersion === 'object') leftVersion = leftVersion.version;
      if (typeof rightVersion === 'object') rightVersion = rightVersion.version;
      return leftVersion !== rightVersion;
    case '':
    case '=':
    case '==':
      // Delegate to generic equality comparison
      return GL6(leftVersion, rightVersion, context);
    case '!=':
      // Delegate to generic inequality comparison
      return ZL6(leftVersion, rightVersion, context);
    case '>':
      // Delegate to greater-than comparison
      return DL6(leftVersion, rightVersion, context);
    case '>=':
      // Delegate to greater-than-or-equal comparison
      return YL6(leftVersion, rightVersion, context);
    case '<':
      // Delegate to less-than comparison
      return WL6(leftVersion, rightVersion, context);
    case '<=':
      // Delegate to less-than-or-equal comparison
      return FL6(leftVersion, rightVersion, context);
    default:
      throw new TypeError(`Invalid operator: ${operator}`);
  }
}

module.exports = compareVersionsWithOperator;