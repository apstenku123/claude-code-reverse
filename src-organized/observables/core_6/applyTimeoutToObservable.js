/**
 * Applies a timeout to an observable, switching to a fallback observable if the timeout is exceeded.
 *
 * @param {Date|number} timeoutValue - The timeout value. Can be a Date (for absolute timeout) or a number (for relative timeout in ms).
 * @param {Function} fallbackObservableFactory - a function that returns the fallback observable to switch to on timeout.
 * @param {Object} [scheduler=cy9.async] - Optional scheduler to use for the timeout. Defaults to cy9.async if not provided.
 * @returns {Observable} An observable with the timeout behavior applied.
 * @throws {TypeError} If no fallback observable is provided or if no timeout value is provided.
 */
function applyTimeoutToObservable(timeoutValue, fallbackObservableFactory, scheduler) {
  let absoluteTimeout = null;
  let relativeTimeout = null;

  // Use provided scheduler or default to cy9.async
  const effectiveScheduler = scheduler !== null && scheduler !== undefined ? scheduler : cy9.async;

  // Determine if timeoutValue is a valid Date or a number (ms)
  if (ly9.isValidDate(timeoutValue)) {
    absoluteTimeout = timeoutValue;
  } else if (typeof timeoutValue === "number") {
    relativeTimeout = timeoutValue;
  }

  // Ensure a fallback observable factory is provided
  if (!fallbackObservableFactory) {
    throw new TypeError("No observable provided to switch to");
  }

  // Ensure at least one timeout value is provided
  if (absoluteTimeout == null && relativeTimeout == null) {
    throw new TypeError("No timeout provided.");
  }

  // Wrap the fallback observable factory for the 'with' option
  const withFallback = function () {
    return fallbackObservableFactory;
  };

  // Apply the timeout operator with the appropriate options
  return iy9.timeout({
    first: absoluteTimeout,
    each: relativeTimeout,
    scheduler: effectiveScheduler,
    with: withFallback
  });
}

module.exports = applyTimeoutToObservable;