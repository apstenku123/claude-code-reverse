/**
 * Creates a handler function for processing template strings or argument lists, with custom formatting and styling logic.
 *
 * @param {Function} templateStringFormatter - Function to process template literals and format them accordingly.
 * @param {Function} stylerFunction - Function to apply additional styling or processing to the formatted string.
 * @param {Function} isEmptyChecker - Function to determine if the input is considered empty.
 * @returns {Function} a handler function that processes template strings or argument lists, applies formatting and styling, and exposes metadata properties.
 */
const createTemplateStringHandler = (templateStringFormatter, stylerFunction, isEmptyChecker) => {
  /**
   * Handler function to process template literals or argument lists.
   *
   * @param {...any} args - Arguments which may be a template literal or a list of values.
   * @returns {string} The processed and formatted string.
   */
  const templateHandler = (...args) => {
    // Check if the first argument is a template literal (has a 'raw' property)
    if (MV1(args[0]) && MV1(args[0].raw)) {
      // If so, format using the template string formatter and pass to the styler
      return applyStylingToString(templateHandler, JK2(templateHandler, ...args));
    }
    // Otherwise, join arguments as a space-separated string (or convert single argument to string)
    const joinedString = args.length === 1 ? String(args[0]) : args.join(" ");
    // Pass the result to the styler function
    return applyStylingToString(templateHandler, joinedString);
  };

  // Set the prototype of the handler function to mB5 (external prototype, possibly for inheritance)
  Object.setPrototypeOf(templateHandler, mB5);
  // Attach metadata properties for reference
  templateHandler._generator = templateStringFormatter;
  templateHandler._styler = stylerFunction;
  templateHandler._isEmpty = isEmptyChecker;

  return templateHandler;
};

module.exports = createTemplateStringHandler;
