/**
 * Creates an object to track the number of successful and failed operations.
 *
 * @returns {{ success: number, failure: number }} An object with counters for successes and failures, both initialized to zero.
 */
function createResultCounter() {
  // Initialize counters for tracking operation results
  return {
    success: 0, // Number of successful operations
    failure: 0  // Number of failed operations
  };
}

module.exports = createResultCounter;