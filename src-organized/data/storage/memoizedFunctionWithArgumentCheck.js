/**
 * Memoizes the result of a function call based on the arguments and context.
 * If called again with the same context and arguments (as determined by the argument checker),
 * returns the cached result instead of recomputing.
 *
 * @param {...any} args - Arguments to pass to the underlying function.
 * @returns {any} The result of the underlying function, either cached or newly computed.
 */
function memoizedFunctionWithArgumentCheck(...args) {
  // Check if the memoization is valid: already memoized, same context, same arguments, and all arguments pass the checker
  if (
    isMemoized &&
    lastThisContext === this &&
    args.length === lastArguments.length &&
    args.every(argumentChecker)
  ) {
    return cachedResult;
  }

  // Update memoization state
  isMemoized = true;
  lastThisContext = this;
  lastArguments = args;
  cachedResult = originalFunction.apply(this, args);
  return cachedResult;
}

module.exports = memoizedFunctionWithArgumentCheck;