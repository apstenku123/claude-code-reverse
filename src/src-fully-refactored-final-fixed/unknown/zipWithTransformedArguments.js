/**
 * Zips the provided arguments after transforming them using bx9 and gx9 helpers.
 *
 * This function collects all arguments into an array, transforms them with bx9,
 * then wraps the result with gx9, and finally applies hx9.zip to the processed array.
 *
 * @param {...any} args - The arguments to be transformed and zipped.
 * @returns {any} The result of hx9.zip applied to the transformed arguments.
 */
function zipWithTransformedArguments(...args) {
  // Transform the arguments array using bx9
  const transformedArguments = bx9(args);

  // Prepare the arguments for hx9.zip by wrapping with gx9 and an empty array
  const zippedArguments = gx9([], transformedArguments);

  // Call hx9.zip with the processed arguments
  return hx9.zip(...zippedArguments);
}

module.exports = zipWithTransformedArguments;
