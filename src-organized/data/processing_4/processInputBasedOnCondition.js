/**
 * Processes the input value based on a global condition.
 *
 * This function assigns the input value to a global variable, performs a side effect
 * by calling a function with global arguments, and then returns the result of one of two
 * functions depending on a global boolean flag.
 *
 * @param {any} inputValue - The value to process and assign.
 * @returns {any} The result of either processWithCondition or defaultResult, depending on the global flag.
 */
function processInputBasedOnCondition(inputValue) {
  // Assign the input value to a global variable for later use
  globalAssignedValue = inputValue;

  // Perform a side effect using global arguments
  globalSideEffectResult = performSideEffect(globalArg1, globalArg2);

  // Return the result of one of two functions depending on the global condition
  if (globalConditionFlag) {
    return processWithCondition(inputValue);
  } else {
    return defaultResult;
  }
}

module.exports = processInputBasedOnCondition;