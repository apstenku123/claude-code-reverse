/**
 * Adds two 2D vectors element-wise and applies a carry-over if the second element exceeds a threshold.
 *
 * @param {number[]} firstVector - The first vector, an array of two numbers.
 * @param {number[]} secondVector - The second vector, an array of two numbers.
 * @returns {number[]} The resulting vector after addition and carry-over adjustment.
 */
function addVectorsWithCarry(firstVector, secondVector) {
  // Element-wise addition of the two vectors
  const resultVector = [
    firstVector[0] + secondVector[0],
    firstVector[1] + secondVector[1]
  ];

  // If the second element exceeds or equals the threshold KG1, apply carry-over
  if (resultVector[1] >= KG1) {
    resultVector[1] -= KG1; // Reduce by threshold
    resultVector[0] += 1;   // Carry over to the first element
  }

  return resultVector;
}

module.exports = addVectorsWithCarry;