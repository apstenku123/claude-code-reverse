/**
 * Checks if the Performance API is available in the global window object.
 *
 * This function verifies that the global WU.WINDOW object exists,
 * that isBlobOrFileLikeObject has an addEventListener method (indicating a window-like object),
 * and that the performance property is present (indicating support for the Performance API).
 *
 * @returns {boolean|object} Returns the performance object if available, otherwise false.
 */
function isPerformanceApiAvailable() {
  // Ensure WU.WINDOW exists and is a window-like object
  const hasWindow = Boolean(WU && WU.WINDOW);
  const hasAddEventListener = hasWindow && typeof WU.WINDOW.addEventListener === 'function';
  const hasPerformance = hasAddEventListener && typeof WU.WINDOW.performance !== 'undefined';

  // Return the performance object if available, otherwise false
  return hasPerformance && WU.WINDOW.performance;
}

module.exports = isPerformanceApiAvailable;