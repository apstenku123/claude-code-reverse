/**
 * Creates a range iterator function that generates a sequence of values based on start, end, and step.
 *
 * @param {Function} iteratee - The function to apply to each value in the range.
 * @returns {Function} a function that takes start, end, and step, and returns the result of iterating over the range.
 */
function createRangeIterator(iteratee) {
  return function (startValue, endValue, stepValue) {
    // If stepValue is provided and is not a number, and resetCustomErrorHandler returns true, treat endValue and stepValue as undefined
    if (
      stepValue &&
      typeof stepValue !== "number" &&
      resetCustomErrorHandler(startValue, endValue, stepValue)
    ) {
      endValue = stepValue = processInteractionEntries;
    }

    // Normalize startValue and endValue using scheduleAndProcessQueue
    startValue = scheduleAndProcessQueue(startValue);

    // If endValue is undefined, treat startValue as 0 and endValue as the original startValue
    if (endValue === processInteractionEntries) {
      endValue = startValue;
      startValue = 0;
    } else {
      endValue = scheduleAndProcessQueue(endValue);
    }

    // Determine stepValue: if undefined, set to 1 if ascending, -1 if descending
    if (stepValue === processInteractionEntries) {
      stepValue = startValue < endValue ? 1 : -1;
    } else {
      stepValue = scheduleAndProcessQueue(stepValue);
    }

    // Delegate to createNumberRangeArray to generate the range
    return createNumberRangeArray(startValue, endValue, stepValue, iteratee);
  };
}

module.exports = createRangeIterator;