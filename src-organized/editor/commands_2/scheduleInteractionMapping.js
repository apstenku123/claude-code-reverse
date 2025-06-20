/**
 * Schedules the mapping of user interactions to routes after a specified delay.
 *
 * This function sets up a timer that, after the given delay, invokes the provided
 * mapping function with the current high-resolution timestamp. It relies on external
 * utilities for time retrieval and scheduling.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes user interaction entries and maps them to route names.
 * @param {number} delayMilliseconds - The delay in milliseconds after which the mapping function should be called.
 * @returns {void}
 */
function scheduleInteractionMapping(mapInteractionsToRoutes, delayMilliseconds) {
  // Schedule the mapping function to run after the specified delay
  on = d30(function () {
    // Pass the current high-resolution timestamp to the mapping function
    mapInteractionsToRoutes(Y_4.unstable_now());
  }, delayMilliseconds);
}

module.exports = scheduleInteractionMapping;