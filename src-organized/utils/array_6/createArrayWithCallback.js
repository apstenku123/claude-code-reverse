/**
 * Creates a new array of a specified length, where each element is generated by invoking a callback function with the current index.
 *
 * @param {number} arrayLength - The desired length of the resulting array.
 * @param {function(number): any} elementGenerator - a callback function that receives the current index and returns the value for that position in the array.
 * @returns {Array<any>} An array of the specified length, with each element generated by the callback function.
 */
function createArrayWithCallback(arrayLength, elementGenerator) {
  // Initialize an empty array with the specified length
  const resultArray = Array(arrayLength);

  // Populate each element using the callback function
  for (let index = 0; index < arrayLength; index++) {
    resultArray[index] = elementGenerator(index);
  }

  return resultArray;
}

module.exports = createArrayWithCallback;
