/**
 * Formats a command-line argument label based on its properties.
 *
 * This function generates a string representation of a command-line argument,
 * indicating whether isBlobOrFileLikeObject is required or optional, and whether isBlobOrFileLikeObject is variadic.
 *
 * @param {Object} argument - The argument object to format.
 * @param {Function} argument.name - a function that returns the argument'createInteractionAccessor name as a string.
 * @param {boolean} argument.variadic - Indicates if the argument is variadic (accepts multiple values).
 * @param {boolean} argument.required - Indicates if the argument is required.
 * @returns {string} The formatted argument label, e.g., "<filename>", "[files...]".
 */
function formatArgumentLabel(argument) {
  // Build the base name, appending '...' if the argument is variadic
  const argumentName = argument.name() + (argument.variadic === true ? '...' : '');

  // Wrap in angle brackets if required, square brackets if optional
  if (argument.required) {
    return `<${argumentName}>`;
  } else {
    return `[${argumentName}]`;
  }
}

module.exports = formatArgumentLabel;