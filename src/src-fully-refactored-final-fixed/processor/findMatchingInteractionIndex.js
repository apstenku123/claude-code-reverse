/**
 * Searches through a list of interaction-route mappings and returns the index of the first entry whose route matches the given route.
 *
 * @param {Array<Array>} interactionRouteMappings - An array of interaction-route mapping entries. Each entry is expected to be an array where the first element is the route to check.
 * @param {*} targetRoute - The route to match against each mapping'createInteractionAccessor first element.
 * @returns {number} The index of the first matching mapping, or -1 if no match is found.
 */
function findMatchingInteractionIndex(interactionRouteMappings, targetRoute) {
  let index = interactionRouteMappings.length;
  // Iterate backwards through the array
  while (index--) {
    // Check if the current mapping'createInteractionAccessor route matches the target route using the OH function
    if (OH(interactionRouteMappings[index][0], targetRoute)) {
      return index;
    }
  }
  // Return -1 if no matching route is found
  return -1;
}

module.exports = findMatchingInteractionIndex;