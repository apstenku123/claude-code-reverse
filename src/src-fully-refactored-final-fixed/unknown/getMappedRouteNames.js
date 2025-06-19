/**
 * Maps an array of interaction entries to route names using a provided mapping function.
 * If the mapping function is not provided, a default mapping function is used.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Function} [mappingFunction] - Optional. The function to map each entry. If not provided, uses the default mapping function.
 * @returns {Array} An array of mapped route names.
 */
function getMappedRouteNames(interactionEntries, mappingFunction) {
  // Get the number of entries in the array, or 0 if the array is null or undefined
  const entryCount = interactionEntries == null ? 0 : interactionEntries.length;

  // If there are no entries, return an empty array
  if (!entryCount) return [];

  // If mappingFunction is not provided, use the default mapping function
  // (a is the default mapping function, k4 ensures mappingFunction is a function)
  const effectiveMappingFunction = mappingFunction === mapInteractionEntriesToRouteNames
    ? 1
    : ensureFunction(mappingFunction);

  // Map the interaction entries using the mapping function
  return mapEntriesToRoutes(interactionEntries, effectiveMappingFunction);
}

module.exports = getMappedRouteNames;