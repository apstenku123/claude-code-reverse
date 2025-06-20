/**
 * Registers a listener that captures the timestamp when the page becomes hidden.
 * This function uses the I59.onHidden method to listen for the 'hidden' event and stores the event'createInteractionAccessor timestamp in lastHiddenTimestamp.
 *
 * @returns {void} This function does not return a value.
 */
function registerOnHiddenTimestampListener() {
  // Listen for the page becoming hidden and capture the event timestamp
  I59.onHidden(({ timeStamp }) => {
    // Store the timestamp in the global lastHiddenTimestamp variable
    lastHiddenTimestamp = timeStamp;
  }, true);
}

module.exports = registerOnHiddenTimestampListener;