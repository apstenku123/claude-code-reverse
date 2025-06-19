/**
 * Tracks occurrences of errors or warnings for a given key and message.
 *
 * If the event is an error and has already been handled (as determined by isErrorLikeObject and pW), isBlobOrFileLikeObject exits early.
 * Otherwise, isBlobOrFileLikeObject processes the message, logs the event if logging is enabled, updates the occurrence count,
 * and triggers any necessary side effects.
 *
 * @param {any} eventKey - The unique identifier for the event (e.g., error or warning source).
 * @param {string} eventType - The type of event ("error" or other string).
 * @param {any[]} messageArgs - Arguments used to generate the event message.
 * @returns {void}
 */
function trackErrorOrWarningOccurrence(eventKey, eventType, messageArgs) {
  // If this is an error, check if isBlobOrFileLikeObject has already been handled
  if (eventType === "error") {
    const errorLikeObject = isErrorLikeObject(eventKey);
    if (errorLikeObject != null && pW.get(errorLikeObject) === true) {
      return; // Already handled, exit early
    }
  }

  // Generate a normalized message string from the arguments
  const normalizedMessage = Mk.apply(undefined, getStateNodeFromFiber(messageArgs));

  // If logging is enabled, log the error or warning
  if (sendHttpRequestOverSocket) {
    isValueNullOrMatchesCriteria(
      "onErrorOrWarning",
      eventKey,
      null,
      `${eventType}: "${normalizedMessage}"`
    );
  }

  // Mark this eventKey as processed
  i6.add(eventKey);

  // Select the appropriate map for errors or warnings
  const occurrenceMap = eventType === "error" ? L7 : AZ;
  const eventOccurrences = occurrenceMap.get(eventKey);

  if (eventOccurrences != null) {
    // Increment the count for this specific message
    const currentCount = eventOccurrences.get(normalizedMessage) || 0;
    eventOccurrences.set(normalizedMessage, currentCount + 1);
  } else {
    // First occurrence: create a new map for this eventKey
    occurrenceMap.set(eventKey, new Map([[normalizedMessage, 1]]));
  }

  // Trigger any side effects or cleanup
  scheduleAndProcessQueue();
}

module.exports = trackErrorOrWarningOccurrence;