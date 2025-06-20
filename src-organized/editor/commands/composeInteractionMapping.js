/**
 * Composes two functions to process user interactions and map them to route names with context.
 *
 * This utility function takes two functions as arguments:
 * - addActivityIfNotFinished: Ensures an activity is only added if not already finished.
 * - mapInteractionsToRouteNames: Maps an array of user interaction entries to route names and context.
 *
 * The returned function applies addActivityIfNotFinished to its input, then passes the result to mapInteractionsToRouteNames.
 *
 * @param {Function} mapInteractionsToRouteNames - Processes an array of user interaction entries, mapping each to a route name and associated context.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the internal stack only if the process has not been marked as finished.
 * @returns {Function} a function that takes a user interaction entry, applies addActivityIfNotFinished, then maps the result to route names and context.
 */
const composeInteractionMapping = (mapInteractionsToRouteNames, addActivityIfNotFinished) => {
  return function (userInteractionEntry) {
    // First, ensure the activity is only added if not finished
    const updatedInteraction = addActivityIfNotFinished(userInteractionEntry);
    // Then, map the updated interaction to route names and context
    return mapInteractionsToRouteNames(updatedInteraction);
  };
};

module.exports = composeInteractionMapping;