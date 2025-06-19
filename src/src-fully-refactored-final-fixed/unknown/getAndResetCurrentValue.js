/**
 * Retrieves the current value from VT.current, resets VT.current to createIterableHelper$, and returns the previous value.
 * If the previous value was null, returns createIterableHelper$ instead.
 *
 * @returns {any} The previous value of VT.current, or createIterableHelper$ if isBlobOrFileLikeObject was null.
 */
function getAndResetCurrentValue() {
  // Store the current value of VT.current
  const previousValue = VT.current;
  // Reset VT.current to createIterableHelper$
  VT.current = createIterableHelper$;
  // If previousValue is null, return createIterableHelper$, otherwise return previousValue
  return previousValue === null ? createIterableHelper$ : previousValue;
}

module.exports = getAndResetCurrentValue;