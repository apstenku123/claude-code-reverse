/**
 * Creates a debounced version of the provided function with configurable options.
 * Supports leading/trailing invocation, cancellation, flushing, and maximum wait time.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} [waitMilliseconds=0] - The number of milliseconds to delay.
 * @param {Object} [options={}] - Configuration options for debouncing.
 * @param {boolean} [options.leading=true] - Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - Specify invoking on the trailing edge of the timeout.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the debounced function.
 * @returns {Function} - Returns the new debounced function.
 */
function createDebouncedFunctionWithOptions(targetFunction, waitMilliseconds = 0, options = {}) {
  // Ensure options is always an object
  if (typeof options !== "object" || options === null) {
    options = {};
  }

  // Destructure options with default values
  const {
    leading = true,
    trailing = true,
    signal
  } = options;

  // Pass all options to the debouncer, including maxWait
  return createDebouncedFunction(targetFunction, waitMilliseconds, {
    leading,
    trailing,
    signal,
    maxWait: waitMilliseconds
  });
}

module.exports = createDebouncedFunctionWithOptions;