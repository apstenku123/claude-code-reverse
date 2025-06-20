/**
 * Checks if the provided object has a 'schedule' method.
 *
 * @param {Object} possibleScheduler - The object to check for a 'schedule' function.
 * @returns {boolean} True if the object exists and has a 'schedule' method; otherwise, false.
 */
function hasScheduleFunction(possibleScheduler) {
  // Ensure the object exists and its 'schedule' property is a function
  return possibleScheduler && Pq9.isFunction(possibleScheduler.schedule);
}

module.exports = hasScheduleFunction;