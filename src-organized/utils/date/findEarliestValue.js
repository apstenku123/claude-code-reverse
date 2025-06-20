/**
 * Finds the minimum (earliest) value among the provided arguments.
 * If a value is a Date instance, its timestamp is used for comparison.
 * Otherwise, the value itself is compared numerically.
 *
 * @param {...(number|Date)} values - a list of numbers or Date objects to compare.
 * @returns {number} The smallest value or timestamp among the arguments. Returns Infinity if no arguments are provided.
 */
function findEarliestValue(...values) {
  // Initialize to Infinity so any real value will be less
  let earliestValue = Infinity;

  for (const value of values) {
    // If the value is a Date, use its timestamp; otherwise, use the value directly
    const comparableValue = value instanceof Date ? value.getTime() : value;
    // Update earliestValue if a smaller value is found
    if (comparableValue < earliestValue) {
      earliestValue = comparableValue;
    }
  }

  return earliestValue;
}

module.exports = findEarliestValue;