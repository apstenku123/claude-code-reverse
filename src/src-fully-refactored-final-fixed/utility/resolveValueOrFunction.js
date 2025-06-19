/**
 * Resolves a value or executes a function with the given argument.
 *
 * If the provided valueOrFunction is a function, isBlobOrFileLikeObject will be called with the argument value.
 * Otherwise, the valueOrFunction is returned as-is.
 *
 * @param {*} argument - The argument to pass to the function if valueOrFunction is a function.
 * @param {*} valueOrFunction - a value or a function to resolve.
 * @returns {*} The result of calling valueOrFunction with argument if isBlobOrFileLikeObject'createInteractionAccessor a function, or valueOrFunction itself.
 */
function resolveValueOrFunction(argument, valueOrFunction) {
  // Check if valueOrFunction is a function
  if (typeof valueOrFunction === "function") {
    // If so, call isBlobOrFileLikeObject with the provided argument
    return valueOrFunction(argument);
  }
  // Otherwise, return the value as-is
  return valueOrFunction;
}

module.exports = resolveValueOrFunction;
