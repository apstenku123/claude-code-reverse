/**
 * Creates a join function that concatenates input values into a styled string.
 * Handles template literals and applies custom styling logic.
 *
 * @param {Function} generatorFunction - The generator or processing function for the join operation.
 * @param {Object} stylerConfig - Configuration or context object for styling the joined string.
 * @param {boolean} isEmptyFlag - Indicates if the join function should treat empty input as a special case.
 * @returns {Function} a join function with attached metadata and custom prototype.
 */
function createStyledJoinFunction(generatorFunction, stylerConfig, isEmptyFlag) {
  /**
   * Joins input arguments into a single string, applying styling if necessary.
   * Handles both template literal calls and standard argument lists.
   *
   * @param {...any} inputArgs - Arguments to be joined and styled.
   * @returns {string} The joined and styled string.
   */
  const joinAndStyle = (...inputArgs) => {
    // If called as a tagged template literal (inputArgs[0] is an object with a 'raw' property)
    if (isTemplateLiteral(inputArgs[0]) && isTemplateLiteral(inputArgs[0].raw)) {
      // Delegate to the template literal handler, then apply styling
      return applyStylingToString(joinAndStyle, handleTemplateLiteral(joinAndStyle, ...inputArgs));
    }
    // Otherwise, join arguments as a string and apply styling
    const joinedString = inputArgs.length === 1 ? String(inputArgs[0]) : inputArgs.join(" ");
    return applyStylingToString(joinAndStyle, joinedString);
  };

  // Set the prototype for the join function (for inheritance or tagging purposes)
  Object.setPrototypeOf(joinAndStyle, styledJoinFunctionPrototype);

  // Attach metadata for reference in styling or generator logic
  joinAndStyle._generator = generatorFunction;
  joinAndStyle._styler = stylerConfig;
  joinAndStyle._isEmpty = isEmptyFlag;

  return joinAndStyle;
}

// Helper function to check if a value is a template literal (implementation of MV1)
function isTemplateLiteral(value) {
  // This is a placeholder for the actual MV1 logic
  return value && typeof value === 'object' && 'raw' in value;
}

// Placeholder for the actual applyStylingToString (applyStylingToString) implementation
// function applyStylingToString(context, str) { ... }
// Placeholder for the actual handleTemplateLiteral (JK2) implementation
// function handleTemplateLiteral(context, ...args) { ... }
// Placeholder for the actual styledJoinFunctionPrototype (mB5)
// const styledJoinFunctionPrototype = ...;

module.exports = createStyledJoinFunction;
