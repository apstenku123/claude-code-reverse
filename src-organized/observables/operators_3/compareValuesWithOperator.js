/**
 * Compares two values using a specified operator, supporting both primitive values and objects with a 'version' property.
 * Delegates to specialized comparison functions for non-strict operators.
 *
 * @param {any} leftValue - The left-hand value to compare. If an object, its 'version' property is used.
 * @param {string} operator - The comparison operator (e.g., '===', '!==', '>', '<=', etc.).
 * @param {any} rightValue - The right-hand value to compare. If an object, its 'version' property is used.
 * @param {any} options - Additional options passed to specialized comparison functions.
 * @returns {boolean} The result of the comparison.
 * @throws {TypeError} If an invalid operator is provided.
 */
function compareValuesWithOperator(leftValue, operator, rightValue, options) {
  switch (operator) {
    case "===": {
      // If either value is an object, use its 'version' property for comparison
      const left = (typeof leftValue === "object" && leftValue !== null) ? leftValue.version : leftValue;
      const right = (typeof rightValue === "object" && rightValue !== null) ? rightValue.version : rightValue;
      return left === right;
    }
    case "!==": {
      // If either value is an object, use its 'version' property for comparison
      const left = (typeof leftValue === "object" && leftValue !== null) ? leftValue.version : leftValue;
      const right = (typeof rightValue === "object" && rightValue !== null) ? rightValue.version : rightValue;
      return left !== right;
    }
    case "":
    case "=":
    case "==":
      // Delegate to generic equality comparison
      return GL6(leftValue, rightValue, options);
    case "!=":
      // Delegate to generic inequality comparison
      return ZL6(leftValue, rightValue, options);
    case ">":
      // Delegate to greater-than comparison
      return DL6(leftValue, rightValue, options);
    case ">=":
      // Delegate to greater-than-or-equal comparison
      return YL6(leftValue, rightValue, options);
    case "<":
      // Delegate to less-than comparison
      return WL6(leftValue, rightValue, options);
    case "<=":
      // Delegate to less-than-or-equal comparison
      return FL6(leftValue, rightValue, options);
    default:
      throw new TypeError(`Invalid operator: ${operator}`);
  }
}

module.exports = compareValuesWithOperator;
