/**
 * Copies properties from a source object to a target object, handling array properties with a custom function.
 *
 * If only the sourceObject is provided, copies all properties from sourceObject to a new object,
 * processing array properties with N72. If a configFunction is provided as the second argument,
 * delegates to Rl6 for custom processing. Otherwise, copies properties from sourceObject to targetObject,
 * handling arrays with N72.
 *
 * @param {Object} sourceObject - The object to copy properties from.
 * @param {Object|Function} [targetOrConfigFunction] - The target object to copy properties to, or a config function for custom processing.
 * @param {Object} [subscription] - Optional subscription or additional configuration for custom processing.
 * @returns {Object} The new object with copied properties, with arrays handled by N72.
 */
function copyObjectWithArrayHandling(sourceObject, targetOrConfigFunction, subscription) {
  let targetObject;
  let configFunction;
  let sourceToCopy;

  // Case 1: Only sourceObject is provided
  if (typeof targetOrConfigFunction === "undefined" && typeof subscription === "undefined") {
    targetObject = {};
    sourceToCopy = sourceObject;
  } else if (typeof targetOrConfigFunction === "function") {
    // Case 2: Second argument is a function, delegate to Rl6
    configFunction = targetOrConfigFunction;
    sourceToCopy = subscription;
    return Rl6(sourceObject, configFunction, sourceToCopy);
  } else {
    // Case 3: Second argument is an object
    targetObject = sourceObject;
    sourceToCopy = targetOrConfigFunction;
  }

  // Copy properties from sourceToCopy to targetObject
  for (const propertyKey of Object.keys(sourceToCopy)) {
    if (!Array.isArray(sourceToCopy[propertyKey])) {
      // Directly copy non-array properties
      targetObject[propertyKey] = sourceToCopy[propertyKey];
      continue;
    }
    // Handle array properties with N72
    N72(targetObject, null, sourceToCopy, propertyKey);
  }

  return targetObject;
}

module.exports = copyObjectWithArrayHandling;