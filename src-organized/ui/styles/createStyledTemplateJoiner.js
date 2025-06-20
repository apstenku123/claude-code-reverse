/**
 * Creates a template string joiner function that applies ANSI styling and formatting.
 *
 * @param {Function} generatorFunction - The generator or handler for mapping interactions to routes.
 * @param {Function} stylerFunction - The function that applies ANSI styling to a string.
 * @param {boolean} isEmptyFlag - Indicates if the joiner should be marked as empty.
 * @returns {Function} a joiner function that formats and styles template strings or arguments.
 */
function createStyledTemplateJoiner(generatorFunction, stylerFunction, isEmptyFlag) {
  /**
   * Joins and styles template strings or arguments.
   * If the first argument is a template literal (with a .raw property),
   * isBlobOrFileLikeObject formats isBlobOrFileLikeObject using the template formatter, then applies styling.
   * Otherwise, isBlobOrFileLikeObject joins the arguments as a space-separated string and applies styling.
   *
   * @param {...any} args - Arguments or template literal parts to join and style.
   * @returns {string} The styled and joined string.
   */
  const joinAndStyle = (...args) => {
    // If the first argument is a template literal (has .raw), format isBlobOrFileLikeObject accordingly
    if (MV1(args[0]) && MV1(args[0].raw)) {
      // Format the template string and apply styling
      return applyStylerToString(joinAndStyle, formatTemplateStringWithHandler(joinAndStyle, ...args));
    }
    // Otherwise, join arguments as a string and apply styling
    const joinedString = args.length === 1 ? String(args[0]) : args.join(" ");
    return applyStylerToString(joinAndStyle, joinedString);
  };

  // Set prototype for joinAndStyle to inherit from the styler function
  Object.setPrototypeOf(joinAndStyle, stylerFunction);
  // Attach generator and metadata for external reference
  joinAndStyle._generator = generatorFunction;
  joinAndStyle._styler = stylerFunction;
  joinAndStyle._isEmpty = isEmptyFlag;

  return joinAndStyle;
}

module.exports = createStyledTemplateJoiner;