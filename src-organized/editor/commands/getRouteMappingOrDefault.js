/**
 * Returns a processed route mapping for the given interaction entries or a default value.
 *
 * If the input is null or undefined, returns a default value based on the type of nullishness.
 * If the global property key (G_) exists in the object, processes the value with a temporary property unset.
 * Otherwise, processes the value with the standard route mapping function.
 *
 * @param {any} interactionEntries - The value to process, typically an array of interaction entries.
 * @returns {any} The mapped route names or a default value.
 */
function getRouteMappingOrDefault(interactionEntries) {
  // If the input is null or undefined, return the appropriate default
  if (interactionEntries == null) {
    // If undefined, return dr4; if null, return mr4
    return interactionEntries === undefined ? dr4 : mr4;
  }

  // If the global property key exists in the object, use the temporary unset logic
  if (G_ && G_ in Object(interactionEntries)) {
    // getValueWithTemporaryPropertyUnset temporarily unsets G_ on the object
    return getValueWithTemporaryPropertyUnset(interactionEntries);
  }

  // Otherwise, use the standard route mapping function
  return mapInteractionEntriesToRouteNames(interactionEntries);
}

module.exports = getRouteMappingOrDefault;