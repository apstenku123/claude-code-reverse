/**
 * Handles a user interaction event, optionally starting a UI action transaction, and manages metric tracking and subscription state.
 *
 * @param {Function} mapInteractionsToRoutes - Processes user interaction entries and maps them to route names with metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the stack if the process is not finished.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Generates a random float >= 0 and < 16.
 * @param {string|undefined} startUiActionClickTransaction - (Optional) Starts a new 'ui.action.click' idle transaction for tracing.
 * @param {boolean} [forceSubscription=false] - If true, forces the use of a newly generated subscription value.
 * @returns {any} The result of createInteractionEntryRemover, which handles the final processing of the interaction.
 */
function handleUserInteractionWithMetrics(
  mapInteractionsToRoutes,
  addActivityIfNotFinished,
  generateRandomNumberBetweenZeroAndSixteen,
  startUiActionClickTransaction,
  forceSubscription = false
) {
  // Ensure the interaction is mapped to the correct route and metadata
  addEntryToObservableCollection(mapInteractionsToRoutes, addActivityIfNotFinished);

  let subscriptionValue;

  // If this is the first time for this interaction, generate and store a subscription value
  if (!j91[mapInteractionsToRoutes]) {
    subscriptionValue = generateRandomNumberBetweenZeroAndSixteen();
    j91[mapInteractionsToRoutes] = true;
  }

  // If a UI action transaction starter is provided, add the metric to the activity stack
  if (startUiActionClickTransaction) {
    addActivityIfNotFinished({
      metric: startUiActionClickTransaction
    });
  }

  // Pass the subscription value to createInteractionEntryRemover only if forceSubscription is true; otherwise, pass undefined
  return createInteractionEntryRemover(
    mapInteractionsToRoutes,
    addActivityIfNotFinished,
    forceSubscription ? subscriptionValue : undefined
  );
}

module.exports = handleUserInteractionWithMetrics;