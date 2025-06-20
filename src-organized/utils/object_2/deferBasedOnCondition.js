/**
 * Defers the execution of a function and returns one of two values based on a condition.
 *
 * This function uses the zO9.defer method to schedule a function for deferred execution.
 * It evaluates the provided condition function (conditionFn). If the condition returns true,
 * isBlobOrFileLikeObject returns the valueIfTrue; otherwise, isBlobOrFileLikeObject returns valueIfFalse.
 *
 * @param {Function} conditionFn - a function that returns a boolean indicating which value to return.
 * @param {*} valueIfTrue - The value to return if the condition function returns true.
 * @param {*} valueIfFalse - The value to return if the condition function returns false.
 * @returns {*} The result of valueIfTrue or valueIfFalse, depending on the condition function.
 */
function deferBasedOnCondition(conditionFn, valueIfTrue, valueIfFalse) {
  // Use zO9.defer to schedule the evaluation of the condition and return the appropriate value
  return zO9.defer(() => {
    return conditionFn() ? valueIfTrue : valueIfFalse;
  });
}

module.exports = deferBasedOnCondition;