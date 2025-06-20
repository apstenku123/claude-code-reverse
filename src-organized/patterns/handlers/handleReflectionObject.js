/**
 * Handles a reflection object by delegating processing based on its type.
 *
 * Depending on whether the reflection object is a Service, Type, or Enum,
 * this function will call the appropriate handler. Throws an error if the object type is unsupported.
 *
 * @param {tz.Service|tz.Type|tz.Enum} reflectionObject - The reflection object to process.
 * @param {object} serviceConfig - Configuration object for Service processing (only used if reflectionObject is a Service).
 * @param {object} serviceSubscription - Subscription object for Service processing (only used if reflectionObject is a Service).
 * @param {object} context - Context or options for Type/Enum processing.
 * @returns {any} The result of the delegated handler function.
 * @throws {Error} If the reflection object is not a Service, Type, or Enum.
 */
function handleReflectionObject(reflectionObject, serviceConfig, serviceSubscription, context) {
  // Check if the object is a Service and delegate to the Service handler
  if (reflectionObject instanceof tz.Service) {
    return mapMethodsToResults(reflectionObject, serviceConfig, serviceSubscription, context);
  }
  // Check if the object is a Type and delegate to the Type handler
  else if (reflectionObject instanceof tz.Type) {
    return Qh1(reflectionObject, context);
  }
  // Check if the object is an Enum and delegate to the Enum handler
  else if (reflectionObject instanceof tz.Enum) {
    return VB6(reflectionObject, context);
  }
  // If the object type is not supported, throw an error
  else {
    throw new Error("Type mismatch in reflection object handling");
  }
}

module.exports = handleReflectionObject;