/**
 * Sets the recombination matrix option after validating and flattening the input matrix.
 *
 * @param {number[][]} inputMatrix - The matrix to set as the recombination matrix. Must be a 3x3 or 4x4 array of numbers.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if inputMatrix is not a valid 3x3 or 4x4 array of numbers.
 */
function setRecombinationMatrix(inputMatrix) {
  // Validate that the input is an array
  if (!Array.isArray(inputMatrix)) {
    throw _A.invalidParameterError("inputMatrix", "array", inputMatrix);
  }

  // Validate that the input is either a 3x3 or 4x4 matrix (array of length 3 or 4)
  if (inputMatrix.length !== 3 && inputMatrix.length !== 4) {
    throw _A.invalidParameterError(
      "inputMatrix",
      "3x3 or 4x4 array",
      inputMatrix.length
    );
  }

  // Flatten the matrix and convert all elements to numbers
  const flattenedMatrix = inputMatrix.flat().map(Number);

  // Validate that the flattened matrix has either 9 (3x3) or 16 (4x4) elements
  if (flattenedMatrix.length !== 9 && flattenedMatrix.length !== 16) {
    throw _A.invalidParameterError(
      "inputMatrix",
      "cardinality of 9 or 16",
      flattenedMatrix.length
    );
  }

  // Set the recombination matrix option and return the current instance for chaining
  this.options.recombMatrix = flattenedMatrix;
  return this;
}

module.exports = setRecombinationMatrix;