/**
 * Defers the execution of a conditional operation and returns one of two results based on the evaluation.
 *
 * @param {Function} conditionFn - a function that returns a boolean indicating which result to return.
 * @param {*} trueResult - The value to return if the condition function evaluates to true.
 * @param {*} falseResult - The value to return if the condition function evaluates to false.
 * @returns {*} The result of trueResult or falseResult, depending on the condition function, wrapped in a deferred execution.
 */
function deferConditionalResult(conditionFn, trueResult, falseResult) {
  // Defer the execution until subscription (or invocation) time
  return zO9.defer(function () {
    // Evaluate the condition function and return the appropriate result
    return conditionFn() ? trueResult : falseResult;
  });
}

module.exports = deferConditionalResult;