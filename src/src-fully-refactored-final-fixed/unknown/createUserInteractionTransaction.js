/**
 * Creates a new user interaction transaction by initializing a LzA instance with the provided dependencies and configuration.
 *
 * @param {Function} mapInteractionsToRoutes - Processes user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Generates a random floating-point number between 0 (inclusive) and 16 (exclusive).
 * @param {Function} startUiActionClickTransaction - Starts a new 'ui.action.click' idle transaction for user interaction tracing.
 * @param {any} externalDependency - An external dependency required by LzA (purpose depends on LzA implementation).
 * @returns {LzA} An instance of LzA initialized with the provided dependencies and configuration.
 */
function createUserInteractionTransaction(
  mapInteractionsToRoutes,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen,
  startUiActionClickTransaction,
  externalDependency
) {
  // Initialize and return a new LzA instance with the provided dependencies
  return new LzA(
    mapInteractionsToRoutes,
    addActivityIfNotFinished,
    generateRandomNumberBetweenZeroAndSixteen,
    startUiActionClickTransaction,
    externalDependency
  );
}

module.exports = createUserInteractionTransaction;
