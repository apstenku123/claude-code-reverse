/**
 * Handles the triggering of render lifecycle events based on application state flags.
 *
 * This function checks two global flags:
 *   - isRenderActive: If true, isBlobOrFileLikeObject triggers the 'render' event via triggerRenderEvent().
 *   - isRenderStopped: If true, isBlobOrFileLikeObject triggers the '--render-stop' event via triggerRenderStopEvent().
 *
 * @returns {void} Does not return a value.
 */
function handleRenderLifecycleEvents() {
  // If rendering is currently active, trigger the render event
  if (isRenderActive) {
    triggerRenderEvent("render");
  }

  // If rendering has been stopped, trigger the render stop event
  if (isRenderStopped) {
    triggerRenderStopEvent("--render-stop");
  }
}

module.exports = handleRenderLifecycleEvents;