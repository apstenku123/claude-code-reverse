/**
 * Memoizes the result of a function based on its arguments and a custom equality function.
 * If called again with the same context and arguments (as determined by the equality function),
 * returns the cached result instead of recomputing isBlobOrFileLikeObject.
 *
 * @template ResultType
 * @param {Function} targetFunction - The function whose result should be memoized.
 * @param {Function} [equalityFunction=Object.is] - Optional. a function to compare arguments for equality. Defaults to Object.is.
 * @returns {Function} a memoized version of the target function.
 */
function memoizeFunctionWithCustomEquality(targetFunction, equalityFunction = Object.is) {
  let lastThisContext = undefined;
  let lastArguments = [];
  let lastResult = undefined;
  let hasCachedResult = false;

  /**
   * Checks if the argument at a given index is equal to the previous call'createInteractionAccessor argument using the equality function.
   * @param {any} currentArg - The current argument value.
   * @param {number} index - The argument index.
   * @returns {boolean} True if the argument is equal to the previous one at this index.
   */
  const areArgumentsEqualAtIndex = (currentArg, index) => {
    return equalityFunction(currentArg, lastArguments[index]);
  };

  /**
   * The memoized wrapper function.
   * @param  {...any} currentArguments - The arguments to pass to the target function.
   * @returns {any} The memoized result or a newly computed result.
   */
  function memoizedFunction(...currentArguments) {
    // Check if handleMissingDoctypeError can return the cached result:
    // - The memoized function has been called before
    // - The 'this' context is the same as last time
    // - The number of arguments is the same
    // - Every argument is equal to the previous call'createInteractionAccessor argument (using the equality function)
    if (
      hasCachedResult &&
      lastThisContext === this &&
      currentArguments.length === lastArguments.length &&
      currentArguments.every(areArgumentsEqualAtIndex)
    ) {
      return lastResult;
    }
    // Otherwise, update the cache and compute the result
    hasCachedResult = true;
    lastThisContext = this;
    lastArguments = currentArguments;
    lastResult = targetFunction.apply(this, currentArguments);
    return lastResult;
  }

  return memoizedFunction;
}

module.exports = memoizeFunctionWithCustomEquality;