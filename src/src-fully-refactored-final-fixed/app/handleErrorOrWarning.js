/**
 * Handles error or warning events by tracking their occurrences and optionally reporting them.
 *
 * @param {string} eventKey - Unique identifier for the event (e.g., error or warning source).
 * @param {string} eventType - Type of event, expected to be either "error" or another string indicating a warning.
 * @param {any[]} eventArguments - Arguments related to the event, used to generate a message.
 * @returns {void}
 */
function handleErrorOrWarning(eventKey, eventType, eventArguments) {
  // If this is an error, check if isBlobOrFileLikeObject should be ignored based on a suppression map
  if (eventType === "error") {
    const suppressionKey = BZ(eventKey);
    if (suppressionKey != null && pW.get(suppressionKey) === true) {
      // Suppressed error, do not proceed further
      return;
    }
  }

  // Generate a string message from the event arguments
  const eventMessage = Mk.apply(undefined, getStateNodeFromFiber(eventArguments));

  // Optionally report the error or warning if reporting is enabled
  if (sendHttpRequestOverSocket) {
    N2("onErrorOrWarning", eventKey, null, `${eventType}: "${eventMessage}"`);
  }

  // Track that this eventKey has been seen
  i6.add(eventKey);

  // Select the appropriate map for errors or warnings
  const eventMap = eventType === "error" ? L7 : AZ;
  const eventStats = eventMap.get(eventKey);

  if (eventStats != null) {
    // Increment the count for this specific event message
    const currentCount = eventStats.get(eventMessage) || 0;
    eventStats.set(eventMessage, currentCount + 1);
  } else {
    // First occurrence: create a new map for this eventKey
    eventMap.set(eventKey, new Map([[eventMessage, 1]]));
  }

  // Perform any post-processing or cleanup
  scheduleAndProcessQueue();
}

module.exports = handleErrorOrWarning;