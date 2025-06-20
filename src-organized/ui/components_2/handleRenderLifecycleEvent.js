/**
 * Handles the render lifecycle events by updating state and emitting render-related events.
 *
 * @param {string} renderId - The identifier for the current render cycle.
 * @returns {void}
 *
 * This function checks if rendering is active, updates the update flag and counter,
 * emits 'render-idle' and 'render' events as needed, and logs the render start if required.
 */
function handleRenderLifecycleEvent(renderId) {
  // Check if rendering is currently active
  if (isRenderingActive) {
    // If an update is pending, reset the flag and increment the update counter
    if (isUpdatePending) {
      isUpdatePending = false;
      updateCounter++;
    }
    // If there are no previous events or the last event is not 'render-idle', emit 'render-idle'
    if (
      renderEventQueue.length === 0 ||
      renderEventQueue[renderEventQueue.length - 1].type !== "render-idle"
    ) {
      emitRenderEvent("render-idle", renderId);
    }
    // Always emit the 'render' event
    emitRenderEvent("render", renderId);
  }
  // If render logging is enabled, log the render start event
  if (isRenderLoggingEnabled) {
    logRenderEvent(`--render-start-${renderId}`);
  }
}

module.exports = handleRenderLifecycleEvent;