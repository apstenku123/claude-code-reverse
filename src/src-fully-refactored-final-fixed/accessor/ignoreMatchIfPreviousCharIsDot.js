/**
 * Checks if the previous character in the input is a dot ('.').
 * If so, calls the ignoreMatch method on the provided context.
 *
 * @param {Object} inputContext - The context containing the input string and current index.
 * @param {Object} matchContext - The context with the ignoreMatch method to be called if condition is met.
 * @returns {void}
 */
function ignoreMatchIfPreviousCharIsDot(inputContext, matchContext) {
  // Check if the character before the current index is a dot
  const previousChar = inputContext.input[inputContext.index - 1];
  if (previousChar === ".") {
    // If so, instruct the match context to ignore this match
    matchContext.ignoreMatch();
  }
}

module.exports = ignoreMatchIfPreviousCharIsDot;