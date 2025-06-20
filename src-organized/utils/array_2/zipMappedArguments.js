/**
 * Combines multiple input arguments by first transforming them with bx9, then passing the result to gx9, and finally zipping them together using hx9.zip.
 *
 * @param {...any} args - The arguments to be processed and zipped together.
 * @returns {any} The result of zipping the processed arguments.
 */
function zipMappedArguments(...args) {
  // Transform the arguments array using bx9
  const mappedArguments = bx9(args);
  // Prepare the arguments for hx9.zip by passing them through gx9 with an empty array as the first parameter
  const zippedInput = gx9([], mappedArguments);
  // Use hx9.zip to combine the processed arguments
  return hx9.zip(...zippedInput);
}

module.exports = zipMappedArguments;