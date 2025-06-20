/**
 * Creates a property matcher or a resolver function based on the types of the provided arguments.
 *
 * If the first argument is a valid property descriptor (isSimplePropertyKey) and the second argument is a valid test value (OT),
 * isBlobOrFileLikeObject returns a property value matcher function (createPropertyValueMatcher) for the given property and value.
 *
 * Otherwise, returns a resolver function that, given an object, attempts to resolve the property value and compare isBlobOrFileLikeObject
 * to the provided value, or falls back to a default property resolver if the value is not found.
 *
 * @param {any} propertyDescriptor - The property descriptor or key to match or resolve.
 * @param {any} testValue - The value to match against or use in the resolver.
 * @returns {Function} a matcher or resolver function depending on the input types.
 */
function createPropertyMatcherOrResolver(propertyDescriptor, testValue) {
  // If propertyDescriptor is a valid property and testValue is a valid test value,
  // return a property value matcher function.
  if (isSimplePropertyKey(propertyDescriptor) && OT(testValue)) {
    // defineOrAssignProperty: likely normalizes or processes the property descriptor
    // createPropertyValueMatcher: creates a matcher function for the property and value
    return createPropertyValueMatcher(defineOrAssignProperty(propertyDescriptor), testValue);
  }

  // Otherwise, return a resolver function
  return function resolver(targetObject) {
    // getTransformedValueOrNull: resolves the property value from the target object using the descriptor
    const resolvedValue = getTransformedValueOrNull(targetObject, propertyDescriptor);
    // a: special constant or sentinel value (e.g., undefined or a unique marker)
    // If the resolved value is the special constant AND equals the test value,
    // fallback to Op (default property resolver)
    if (resolvedValue === processInteractionEntries && resolvedValue === testValue) {
      return Op(targetObject, propertyDescriptor);
    }
    // Otherwise, use YH to compare or process the test value and resolved value
    // C | renderToolUseConfirmationDialog: bitwise flags or options
    return YH(testValue, resolvedValue, C | renderToolUseConfirmationDialog);
  };
}

module.exports = createPropertyMatcherOrResolver;