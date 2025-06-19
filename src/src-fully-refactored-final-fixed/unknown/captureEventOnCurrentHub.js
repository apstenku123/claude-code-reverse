/**
 * Captures an event using the current hub instance.
 *
 * This function delegates to the current hub'createInteractionAccessor `captureEvent` method, passing the provided event data and optional hint.
 *
 * @param {Object} eventData - The event object to be captured (e.g., error, message, or custom event).
 * @param {Object} [captureHint] - Optional hint or additional context for the event capture.
 * @returns {any} The result of the hub'createInteractionAccessor captureEvent method, typically an event updateSnapshotAndNotify or undefined.
 */
function captureEventOnCurrentHub(eventData, captureHint) {
  // Delegate event capturing to the current hub instance
  return KQ.getCurrentHub().captureEvent(eventData, captureHint);
}

module.exports = captureEventOnCurrentHub;