/**
 * Handles Sentry event capturing and deduplication for UI events.
 * Adds tracking properties to events and their targets, prevents duplicate captures,
 * and manages global state for event type and Sentry IDs. Also handles cleanup with a timeout.
 *
 * @param {Function} processEventCallback - Callback to process the event (e.g., send to Sentry).
 * @param {boolean} [isGlobal=false] - Whether the event is global in scope.
 * @returns {Function} Event handler function to be used as a listener or callback.
 */
function createSentryEventHandler(processEventCallback, isGlobal = false) {
  return function handleEvent(event) {
    // Ignore if event is missing or already captured
    if (!event || event._sentryCaptured) return;

    // Get the event target (e.g., DOM element)
    const eventTarget = getEventTargetSafely(event);

    // If the event type and target combination should be ignored, exit
    if (shouldHandleKeypressEvent(event.type, eventTarget)) return;

    // Mark the event as captured to prevent duplicate processing
    z21.addNonEnumerableProperty(event, "_sentryCaptured", true);

    // If the target exists and doesn'processRuleBeginHandlers have a Sentry updateSnapshotAndNotify, assign one
    if (eventTarget && !eventTarget._sentryId) {
      z21.addNonEnumerableProperty(eventTarget, "_sentryId", Jd2.uuid4());
    }

    // Normalize event type: treat 'keypress' as 'input' for tracking
    const eventName = event.type === "keypress" ? "input" : event.type;

    // Only process the event if isBlobOrFileLikeObject passes the isValidSentryEvent filter
    if (!isValidSentryEvent(event)) {
      processEventCallback({
        event,
        name: eventName,
        global: isGlobal
      });
      // Update global state for last event type and Sentry updateSnapshotAndNotify
      kE1 = event.type;
      yE1 = eventTarget ? eventTarget._sentryId : undefined;
    }

    // Clear any existing timeout and set a new one for cleanup
    clearTimeout(k6A);
    k6A = by.setTimeout(() => {
      yE1 = undefined;
      kE1 = undefined;
    }, Cd2);
  };
}

module.exports = createSentryEventHandler;