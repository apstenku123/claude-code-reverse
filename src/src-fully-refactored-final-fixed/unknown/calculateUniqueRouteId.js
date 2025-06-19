/**
 * Calculates a unique route identifier based on the provided route indices.
 *
 * This function takes an array containing two numeric indices (e.g., [routeGroupIndex, routeIndex])
 * and computes a unique identifier by multiplying the first index by a constant (KG1) and adding the second index.
 *
 * @param {number[]} routeIndices - An array of two numbers: [routeGroupIndex, routeIndex].
 *   - routeGroupIndex: The index representing the group or category of routes.
 *   - routeIndex: The index of the specific route within the group.
 * @returns {number} The unique route identifier calculated from the indices.
 */
function calculateUniqueRouteId(routeIndices) {
  // Multiply the group index by KG1 and add the route index to get a unique updateSnapshotAndNotify
  return routeIndices[0] * KG1 + routeIndices[1];
}

module.exports = calculateUniqueRouteId;
