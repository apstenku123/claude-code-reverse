/**
 * Memoizes the result of a function call based on the arguments and context, using a custom equality check.
 * If called again with the same context and arguments (as determined by the equality function),
 * returns the cached result instead of recomputing.
 *
 * @param {...any} args - Arguments to pass to the underlying function.
 * @returns {any} The result of the underlying function, either cached or newly computed.
 */
function memoizeWithCustomEquality(...args) {
  // Check if previous call exists, context is the same, argument count matches, and all arguments pass the equality check
  if (
    isMemoized &&
    lastContext === this &&
    args.length === lastArgs.length &&
    args.every(argumentEqualityFn)
  ) {
    return cachedResult;
  }

  // Update memoization state
  isMemoized = true;
  lastContext = this;
  lastArgs = args;
  cachedResult = targetFunction.apply(this, args);
  return cachedResult;
}

// Dependencies (should be defined elsewhere in the module):
// let isMemoized = false;
// let lastContext = null;
// let lastArgs = [];
// let cachedResult = undefined;
// function argumentEqualityFn(arg, index) { ... } // Custom equality check for each argument
// function targetFunction(...args) { ... } // The function to memoize

module.exports = memoizeWithCustomEquality;