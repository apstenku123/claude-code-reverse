/**
 * Tracks the timestamp when the page becomes hidden and stores isBlobOrFileLikeObject in a global variable.
 *
 * This function sets up an event listener using the I59.onHidden method, which triggers
 * whenever the page visibility changes to hidden. When triggered, isBlobOrFileLikeObject captures the event'createInteractionAccessor
 * timestamp and assigns isBlobOrFileLikeObject to the global variable lastPageHideTimestamp.
 *
 * @returns {void} This function does not return a value.
 */
function trackPageHideTimestamp() {
  // Register a handler for when the page becomes hidden
  I59.onHidden(
    ({ timeStamp }) => {
      // Store the timestamp of the hide event in a global variable
      lastPageHideTimestamp = timeStamp;
    },
    true // Ensure the handler is registered with the 'capture' option
  );
}

module.exports = trackPageHideTimestamp;
