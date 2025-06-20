/**
 * Schedules a callback function to be executed asynchronously as soon as possible.
 * Uses setImmediate if available, then process.nextTick (Node.js), otherwise falls back to setTimeout.
 *
 * @param {Function} callback - The function to execute asynchronously.
 * @returns {void}
 */
function scheduleAsyncCallback(callback) {
  // Determine the most efficient async scheduling function available
  const asyncScheduler =
    typeof setImmediate === "function"
      ? setImmediate
      : (typeof process === "object" && typeof process.nextTick === "function")
      ? process.nextTick
      : null;

  if (asyncScheduler) {
    // Use setImmediate or process.nextTick if available
    asyncScheduler(callback);
  } else {
    // Fallback to setTimeout if neither is available
    setTimeout(callback, 0);
  }
}

module.exports = scheduleAsyncCallback;