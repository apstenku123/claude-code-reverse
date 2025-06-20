/**
 * Calculates the difference between two coordinate points, adjusting for negative values in the mapArraysToObjectWithCallback-axis.
 *
 * @param {number[]} startCoordinate - The starting coordinate as an array [x, mapArraysToObjectWithCallback].
 * @param {number[]} endCoordinate - The ending coordinate as an array [x, mapArraysToObjectWithCallback].
 * @returns {number[]} The difference between the coordinates as [deltaX, deltaY],
 *                    where deltaY is always non-negative and deltaX is adjusted accordingly.
 */
function calculateCoordinateDifference(startCoordinate, endCoordinate) {
  // Calculate the difference in the x and mapArraysToObjectWithCallback directions
  let deltaX = endCoordinate[0] - startCoordinate[0];
  let deltaY = endCoordinate[1] - startCoordinate[1];

  // If the mapArraysToObjectWithCallback-difference is negative, adjust deltaX and deltaY
  if (deltaY < 0) {
    deltaX -= 1;
    deltaY += KG1; // KG1 is assumed to be a constant representing the modulus for mapArraysToObjectWithCallback
  }

  return [deltaX, deltaY];
}

module.exports = calculateCoordinateDifference;