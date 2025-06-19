/**
 * Checks if the provided function contains the '^_^' marker, which indicates that React'createInteractionAccessor dead code elimination has not been applied in production mode.
 * If the marker is found, schedules an error to be thrown asynchronously with a helpful message.
 *
 * @param {Function} targetFunction - The function to inspect for the dead code elimination marker.
 * @returns {void}
 */
function warnIfReactDeadCodeEliminationMissing(targetFunction) {
  try {
    // Get the string representation of the function
    const functionToString = Function.prototype.toString;
    const functionSource = functionToString.call(targetFunction);

    // Check for the '^_^' marker, which indicates missing dead code elimination
    if (functionSource.indexOf('^_^') > -1) {
      // Schedule an error to be thrown asynchronously to avoid breaking current execution
      setTimeout(function () {
        throw new Error(
          'React is running in production mode, but dead code elimination has not been applied. ' +
          'Read how to correctly configure React for production: https://react.dev/link/perf-use-production-build'
        );
      });
    }
  } catch (error) {
    // Silently ignore any errors during inspection
  }
}

module.exports = warnIfReactDeadCodeEliminationMissing;