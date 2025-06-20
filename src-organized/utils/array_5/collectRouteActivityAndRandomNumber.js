/**
 * Collects the results of mapping user interactions to route names, adding activity if not finished, and generating a random number.
 *
 * @param {Function} mapInteractionsToRouteNames - Processes an array of user interaction entries, mapping each to a route name and associated context.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the internal stack only if the process has not been marked as finished.
 * @param {Function} generateRandomNumberUpToSixteen - Generates a random floating-point number between 0 (inclusive) and 16 (exclusive).
 * @returns {Array} An array containing the results of the three provided functions.
 */
const collectRouteActivityAndRandomNumber = (
  mapInteractionsToRouteNames,
  addActivityIfNotFinished,
  generateRandomNumberUpToSixteen
) => {
  // Return all three function references as an array
  return [
    mapInteractionsToRouteNames,
    addActivityIfNotFinished,
    generateRandomNumberUpToSixteen
  ];
};

module.exports = collectRouteActivityAndRandomNumber;
