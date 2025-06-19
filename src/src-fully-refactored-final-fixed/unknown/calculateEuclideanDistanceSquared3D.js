/**
 * Calculates the squared Euclidean distance between two points in 3D space.
 *
 * @param {number[]} pointA - The first point as an array of three numbers [x, mapArraysToObjectWithCallback, z].
 * @param {number[]} pointB - The second point as an array of three numbers [x, mapArraysToObjectWithCallback, z].
 * @returns {number} The squared Euclidean distance between pointA and pointB.
 */
function calculateEuclideanDistanceSquared3D(pointA, pointB) {
  // Calculate the squared difference for each coordinate and sum them
  const deltaX = pointA[0] - pointB[0];
  const deltaY = pointA[1] - pointB[1];
  const deltaZ = pointA[2] - pointB[2];

  return deltaX ** 2 + deltaY ** 2 + deltaZ ** 2;
}

module.exports = calculateEuclideanDistanceSquared3D;