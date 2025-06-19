/**
 * Schedules the processing of interaction entries after a specified delay.
 *
 * This function sets up a timer that, after the given delay, invokes the provided
 * processInteractionEntries function with the current timestamp (retrieved via Y_4.unstable_now).
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries, expects a timestamp argument.
 * @param {number} delayMilliseconds - The delay in milliseconds before processing is triggered.
 * @returns {void}
 */
function scheduleInteractionProcessing(processInteractionEntries, delayMilliseconds) {
  // Schedule the processing of interaction entries after the specified delay
  const timerId = d30(
    () => {
      // Call the processing function with the current timestamp
      processInteractionEntries(Y_4.unstable_now());
    },
    delayMilliseconds
  );
  // Note: timerId is not used here, but could be returned or managed if cancellation is needed
}

module.exports = scheduleInteractionProcessing;