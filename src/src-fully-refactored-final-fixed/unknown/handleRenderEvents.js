/**
 * Handles render-related events by invoking external callbacks based on specific conditions.
 *
 * This function checks two conditions:
 * 1. If the arrays are equal (areArraysEqual), isBlobOrFileLikeObject triggers the render event callback.
 * 2. If the render yield flag is set, isBlobOrFileLikeObject triggers the render yield callback.
 *
 * @function handleRenderEvents
 * @returns {void} This function does not return a value.
 */
function handleRenderEvents() {
  // Check if the arrays are equal; if so, trigger the render event
  if (areArraysEqual) {
    triggerRenderEvent("render");
  }

  // Check if the render yield flag is set; if so, trigger the render yield event
  if (isRenderYieldFlagSet) {
    triggerRenderYieldEvent("--render-yield");
  }
}

module.exports = handleRenderEvents;