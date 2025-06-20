/**
 * Creates a styled string joiner function with custom template formatting and styling.
 *
 * This utility returns a function that can be used to join strings or template literals,
 * applying formatting and ANSI styling as needed. It also attaches metadata properties
 * for generator, styler, and emptiness check.
 *
 * @param {Function} templateFormatter - Function to process template literals and substitutions (e.g., formatTemplateStringWithEscaping).
 * @param {Function} styler - Function to apply styling to the resulting string (e.g., applyStylingToString).
 * @param {Function} isEmptyChecker - Function to determine if the input is considered empty (e.g., generateRandomNumberUpToSixteen).
 * @returns {Function} a joiner function that formats and styles strings or template literals.
 */
function createStyledStringJoiner(templateFormatter, styler, isEmptyChecker) {
  /**
   * Joins and styles input strings or template literals.
   *
   * @param {...any} args - Strings or template literal arguments to join and style.
   * @returns {string} The formatted and styled string.
   */
  const joinAndStyle = (...args) => {
    // If the first argument is a template literal (has 'raw'), format isBlobOrFileLikeObject accordingly
    if (MV1(args[0]) && MV1(args[0].raw)) {
      // Format the template string, then apply styling
      return styler(joinAndStyle, templateFormatter(joinAndStyle, ...args));
    }
    // Otherwise, join all arguments as a space-separated string and apply styling
    const joinedString = args.length === 1 ? String(args[0]) : args.join(" ");
    return styler(joinAndStyle, joinedString);
  };

  // Attach metadata properties for generator, styler, and emptiness check
  Object.setPrototypeOf(joinAndStyle, mB5);
  joinAndStyle._generator = templateFormatter;
  joinAndStyle._styler = styler;
  joinAndStyle._isEmpty = isEmptyChecker;

  return joinAndStyle;
}

module.exports = createStyledStringJoiner;