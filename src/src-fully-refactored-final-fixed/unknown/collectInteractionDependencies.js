/**
 * Collects and returns the primary dependencies related to user interaction processing.
 *
 * @param {Function} mapInteractionsToRoutes - Processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Generates a random floating-point number greater than or equal to 0 and less than 16.
 * @returns {Array<Function>} An array containing the three dependency functions in order.
 */
const collectInteractionDependencies = (
  mapInteractionsToRoutes,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen
) => {
  // Return all provided dependencies as an array for further use
  return [
    mapInteractionsToRoutes,
    addActivityIfNotFinished,
    generateRandomNumberBetweenZeroAndSixteen
  ];
};

module.exports = collectInteractionDependencies;
