/**
 * Initializes the user interaction context by assigning the provided dependencies to the instance.
 *
 * @param {Function} mapInteractionsToRoutes - Processes user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Generates a random floating-point number >= 0 and < 16.
 * @param {Function} startUiActionClickTransaction - Starts a new 'ui.action.click' idle transaction for user interaction tracing.
 * @returns {void}
 */
function initializeUserInteractionContext(
  mapInteractionsToRoutes,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen,
  startUiActionClickTransaction
) {
  // Assign dependencies to the instance for later use
  this.mapInteractionsToRoutes = mapInteractionsToRoutes;
  this.addActivityIfNotFinished = addActivityIfNotFinished;
  this.generateRandomNumberBetweenZeroAndSixteen = generateRandomNumberBetweenZeroAndSixteen;
  this.startUiActionClickTransaction = startUiActionClickTransaction;
}

module.exports = initializeUserInteractionContext;