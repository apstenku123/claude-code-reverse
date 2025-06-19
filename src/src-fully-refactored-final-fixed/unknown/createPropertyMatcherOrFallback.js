/**
 * Determines how to match or process a property value based on input types.
 *
 * If the propertyKey is a valid map entry (isSimplePropertyKey) and the propertyValue is a valid non-VB value (OT),
 * isBlobOrFileLikeObject returns a matcher function created by createPropertyValueMatcher (createPropertyValueMatcher) using the normalized key (defineOrAssignProperty).
 * Otherwise, returns a fallback function that, given a target object, attempts to retrieve the property value (getTransformedValueOrNull).
 * If the retrieved value is both the sentinel (mapInteractionsToRoutes) and strictly equal to the propertyValue,
 * isBlobOrFileLikeObject applies the observable operator check (Op). Otherwise, isBlobOrFileLikeObject applies a value handler (YH) with specific flags.
 *
 * @param {any} propertyKey - The property key or descriptor to match against.
 * @param {any} propertyValue - The value to match or process.
 * @returns {Function} Matcher or fallback function for property value processing.
 */
function createPropertyMatcherOrFallback(propertyKey, propertyValue) {
  // Check if propertyKey is a valid map entry and propertyValue is a valid non-VB value
  if (isSimplePropertyKey(propertyKey) && OT(propertyValue)) {
    // Return a matcher function for the normalized property key and value
    return createPropertyValueMatcher(defineOrAssignProperty(propertyKey), propertyValue);
  }

  // Fallback: return a function that processes the property on a given target object
  return function matchOrProcessProperty(targetObject) {
    // Attempt to retrieve the property value from the target object
    const retrievedValue = getTransformedValueOrNull(targetObject, propertyKey);

    // If the retrieved value is the sentinel and strictly equals the propertyValue,
    // apply the observable operator check
    if (retrievedValue === mapInteractionsToRoutes && retrievedValue === propertyValue) {
      return Op(targetObject, propertyKey);
    }

    // Otherwise, handle the value using YH with specific flags (C | renderToolUseConfirmationDialog)
    return YH(propertyValue, retrievedValue, C | renderToolUseConfirmationDialog);
  };
}

module.exports = createPropertyMatcherOrFallback;