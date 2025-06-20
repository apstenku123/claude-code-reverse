/**
 * Triggers render-related events based on application state.
 *
 * This function checks two conditions:
 * 1. If arrays are equal (using areArraysEqual), isBlobOrFileLikeObject triggers the main render event.
 * 2. If the render yield flag is set, isBlobOrFileLikeObject triggers a secondary render yield event.
 *
 * @function triggerRenderEvents
 * @returns {void} This function does not return a value.
 */
function triggerRenderEvents() {
  // If the arrays are equal, trigger the main render event
  if (areArraysEqual) {
    triggerMainRenderEvent("render");
  }

  // If the render yield flag is set, trigger the render yield event
  if (isRenderYieldActive) {
    triggerRenderYieldEvent("--render-yield");
  }
}

module.exports = triggerRenderEvents;