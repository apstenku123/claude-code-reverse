/**
 * Retrieves the current value from the VT object, updates VT.current to createIterableHelper$,
 * and returns the previous value if isBlobOrFileLikeObject exists, otherwise returns createIterableHelper$.
 *
 * @returns {any} The previous value of VT.current if isBlobOrFileLikeObject was not null, otherwise createIterableHelper$.
 */
function getAndUpdateCurrentValue() {
  // Store the current value of VT.current
  const previousCurrentValue = VT.current;
  // Update VT.current to createIterableHelper$
  VT.current = createIterableHelper$;
  // If previous value was null, return createIterableHelper$, else return the previous value
  return previousCurrentValue === null ? createIterableHelper$ : previousCurrentValue;
}

module.exports = getAndUpdateCurrentValue;