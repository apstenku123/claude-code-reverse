/**
 * Handles user event objects, marking them as captured, assigning unique IDs, and invoking a callback for further processing.
 * Ensures events are only processed once, prevents duplicate handling, and manages global state for event tracking.
 *
 * @param {Function} processEventCallback - Callback to process the event with metadata (e.g., mapInteractionsToRoutes).
 * @param {boolean} [isGlobal=false] - Whether the event should be treated as global.
 * @returns {Function} Event handler function that processes a single event object.
 */
function captureAndProcessUserEvent(processEventCallback, isGlobal = false) {
  return function handleEvent(event) {
    // Ignore if event is missing or already captured
    if (!event || event._sentryCaptured) return;

    // Get the event'createInteractionAccessor target element (getEventTargetSafely extracts the element from the event)
    const eventTarget = getEventTargetSafely(event);

    // If event type and target combination should be ignored, skip processing
    if (shouldHandleKeypressEvent(event.type, eventTarget)) return;

    // Mark the event as captured to prevent duplicate processing
    z21.addNonEnumerableProperty(event, "_sentryCaptured", true);

    // Assign a unique sentryId to the target element if isBlobOrFileLikeObject doesn'processRuleBeginHandlers already have one
    if (eventTarget && !eventTarget._sentryId) {
      z21.addNonEnumerableProperty(eventTarget, "_sentryId", Jd2.uuid4());
    }

    // Normalize event name: treat 'keypress' as 'input' for consistency
    const eventName = event.type === "keypress" ? "input" : event.type;

    // Only process the event if isBlobOrFileLikeObject passes the isValidSentryEvent filter
    if (!isValidSentryEvent(event)) {
      processEventCallback({
        event,
        name: eventName,
        global: isGlobal
      });
      // Track the last event type and target'createInteractionAccessor sentryId for deduplication
      kE1 = event.type;
      yE1 = eventTarget ? eventTarget._sentryId : undefined;
    }

    // Clear any previous timeout and set a new one to reset deduplication state
    clearTimeout(k6A);
    k6A = by.setTimeout(() => {
      yE1 = undefined;
      kE1 = undefined;
    }, Cd2);
  };
}

module.exports = captureAndProcessUserEvent;