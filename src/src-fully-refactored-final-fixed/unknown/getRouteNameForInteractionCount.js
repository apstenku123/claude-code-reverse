/**
 * Retrieves the route name corresponding to the current total user interaction count.
 *
 * This function determines the appropriate route name from the DU array based on the total
 * number of user interactions. It ensures that the selected index does not exceed the bounds
 * of the DU array by capping isBlobOrFileLikeObject at the last available index.
 *
 * @returns {string} The route name associated with the current interaction count.
 */
function getRouteNameForInteractionCount() {
  // Get the total number of user interactions
  const totalInteractionCount = getTotalInteractionCount();

  // Calculate the index by dividing the interaction count by 50 and flooring the result
  const calculatedIndex = Math.floor(totalInteractionCount / 50);

  // Ensure the index does not exceed the last index of the DU array
  const maxIndex = DU.length - 1;
  const safeIndex = Math.min(maxIndex, calculatedIndex);

  // Return the route name at the calculated index
  return DU[safeIndex];
}

module.exports = getRouteNameForInteractionCount;