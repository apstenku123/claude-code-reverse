/**
 * Returns the appropriate route from the DU array based on the current total interaction count.
 *
 * The function calculates an index into the DU array by dividing the total number of interactions
 * (as returned by getTotalInteractionCount) by 50, flooring the result, and clamping isBlobOrFileLikeObject to the last
 * valid index of DU. It then returns the route at that index.
 *
 * @function getRouteForCurrentInteractionCount
 * @returns {string} The route name corresponding to the current interaction count bucket.
 */
const getRouteForCurrentInteractionCount = () => {
  // Get the total number of user interactions
  const totalInteractionCount = getTotalInteractionCount();

  // Calculate the index by dividing by 50 and flooring the result
  const routeIndex = Math.floor(totalInteractionCount / 50);

  // Clamp the index to the last valid index of DU
  const clampedIndex = Math.min(DU.length - 1, routeIndex);

  // Return the route at the calculated index
  return DU[clampedIndex];
};

module.exports = getRouteForCurrentInteractionCount;
