/**
 * Creates a debounced version of the provided function with support for leading/trailing invocation and an optional maximum wait time.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} waitMilliseconds - The number of milliseconds to delay invocation (and as maxWait).
 * @param {Object} [options={}] - Optional configuration for debounce behavior.
 * @param {boolean} [options.leading=true] - Whether to invoke on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - Whether to invoke on the trailing edge of the timeout.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the debounced function.
 * @returns {Function} - The debounced function with maxWait support.
 */
function createDebouncedFunctionWithMaxWait(targetFunction, waitMilliseconds = 0, options = {}) {
  // Ensure options is always an object
  if (typeof options !== "object" || options === null) {
    options = {};
  }

  // Destructure debounce options with defaults
  const {
    leading = true,
    trailing = true,
    signal
  } = options;

  // Call the underlying debounce implementation with maxWait
  return debounceWithMaxWait(targetFunction, waitMilliseconds, {
    leading,
    trailing,
    signal,
    maxWait: waitMilliseconds
  });
}

module.exports = createDebouncedFunctionWithMaxWait;