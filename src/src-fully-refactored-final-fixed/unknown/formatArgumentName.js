/**
 * Formats a command-line argument name with appropriate brackets and ellipsis based on its properties.
 *
 * @param {Object} argument - The argument object to format.
 * @param {Function} argument.name - Function that returns the argument'createInteractionAccessor name as a string.
 * @param {boolean} argument.variadic - Indicates if the argument is variadic (accepts multiple values).
 * @param {boolean} argument.required - Indicates if the argument is required.
 * @returns {string} The formatted argument name, wrapped in angle brackets if required, or square brackets if optional. Adds ellipsis if variadic.
 */
function formatArgumentName(argument) {
  // Get the base name of the argument
  const argumentName = argument.name();
  // Append ellipsis if the argument is variadic
  const formattedName = argumentName + (argument.variadic === true ? '...' : '');
  // Wrap in angle brackets if required, otherwise in square brackets
  return argument.required ? `<${formattedName}>` : `[${formattedName}]`;
}

module.exports = formatArgumentName;
