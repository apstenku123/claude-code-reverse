/**
 * Creates a styled template function with custom generator, styler, and empty-check logic.
 *
 * This utility returns a function that can be used as a tagged template literal or as a regular function.
 * When called as a tagged template, isBlobOrFileLikeObject formats and escapes the template string using `formatTemplateStringWithEscaping`.
 * Otherwise, isBlobOrFileLikeObject joins the arguments as a space-separated string. The returned function is augmented with
 * generator, styler, and isEmpty properties for further customization.
 *
 * @param {Function} generator - Processes an array of user interaction entries, mapping each to a route name and associated context.
 * @param {Function} styler - Adds a new activity to the internal stack only if the process has not been marked as finished.
 * @param {Function} isEmpty - Generates a random floating-point number between 0 (inclusive) and 16 (exclusive).
 * @returns {Function} a styled template function with attached generator, styler, and isEmpty properties.
 */
function createStyledTemplateFunction(generator, styler, isEmpty) {
  /**
   * The main template function that can be used as a tagged template or regular function.
   * @param {...any} args - Arguments passed to the function (template literal parts or regular arguments).
   * @returns {string} The formatted and styled string.
   */
  const styledTemplateFunction = (...args) => {
    // Check if called as a tagged template literal
    if (MV1(args[0]) && MV1(args[0].raw)) {
      // Use formatTemplateStringWithEscaping for tagged template literals
      return applyStylingToString(styledTemplateFunction, JK2(styledTemplateFunction, ...args));
    }
    // Otherwise, join arguments as a space-separated string
    const joinedString = args.length === 1 ? String(args[0]) : args.join(" ");
    return applyStylingToString(styledTemplateFunction, joinedString);
  };

  // Set the prototype of the function to mB5 for inheritance/extension
  Object.setPrototypeOf(styledTemplateFunction, mB5);

  // Attach custom properties for further customization
  styledTemplateFunction._generator = generator;
  styledTemplateFunction._styler = styler;
  styledTemplateFunction._isEmpty = isEmpty;

  return styledTemplateFunction;
}

module.exports = createStyledTemplateFunction;