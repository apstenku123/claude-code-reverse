/**
 * Adds two 2D vectors element-wise and applies a modulo carry to the second element.
 * If the sum of the second elements exceeds or equals KG1, subtracts KG1 from the second element and increments the first element by 1.
 *
 * @param {number[]} vectorA - The first 2D vector as an array of two numbers [x, mapArraysToObjectWithCallback].
 * @param {number[]} vectorB - The second 2D vector as an array of two numbers [x, mapArraysToObjectWithCallback].
 * @returns {number[]} The resulting 2D vector after addition and modulo carry adjustment.
 */
function addVectorsWithModuloCarry(vectorA, vectorB) {
  // Add corresponding elements of the two vectors
  const resultVector = [
    vectorA[0] + vectorB[0], // Sum of first elements
    vectorA[1] + vectorB[1]  // Sum of second elements
  ];

  // If the second element exceeds or equals KG1, apply modulo carry
  if (resultVector[1] >= KG1) {
    resultVector[1] -= KG1; // Subtract KG1 from the second element
    resultVector[0] += 1;   // Increment the first element (carry over)
  }

  return resultVector;
}

module.exports = addVectorsWithModuloCarry;