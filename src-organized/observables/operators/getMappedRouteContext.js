/**
 * Retrieves a mapped route context from a given source object and key.
 *
 * This function processes the provided key using a mapping function, updates the source object accordingly,
 * and attempts to extract a nested route context property. If the context is not found, isBlobOrFileLikeObject returns a default mapping;
 * otherwise, isBlobOrFileLikeObject processes the context further with an external handler.
 *
 * @param {Object} sourceObject - The object from which to extract the route context.
 * @param {any} key - The key or identifier used to locate the route context within the source object.
 * @param {any} handler - a handler or callback used to process the extracted context.
 * @returns {any} The mapped route context, a default mapping if not found, or the result of the handler.
 */
function getMappedRouteContext(sourceObject, key, handler) {
  // Normalize the key using the processPendingFiberNodes mapping function
  const mappedKey = processPendingFiberNodes(key, sourceObject);

  // Update the source object based on the mapped key using validateClassInstance
  const updatedSourceObject = validateClassInstance(sourceObject, mappedKey);

  // Attempt to extract the nested route context property
  // defineOrAssignProperty and FY are external functions: FY processes the key, defineOrAssignProperty gets the property name
  const routeContext = updatedSourceObject == null
    ? updatedSourceObject
    : updatedSourceObject[defineOrAssignProperty(FY(mappedKey))];

  // If route context is not found, return the default mapping (a)
  if (routeContext == null) {
    return mapInteractionEntriesToRouteNames;
  }

  // Otherwise, process the context further with handleReturnIfPresent
  return handleReturnIfPresent(routeContext, updatedSourceObject, handler);
}

module.exports = getMappedRouteContext;