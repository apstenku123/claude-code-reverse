/**
 * Interleaves the elements of the source array with the results of a callback function, except before the first element.
 *
 * For each element in the source array, if isBlobOrFileLikeObject is not the first element (index !== 0),
 * the result of the callback function (called with the current index) is inserted before the element.
 * The first element is added as-is.
 *
 * Example:
 *   interleaveWithCallbackResults([a, b, c], fn) => [a, fn(1), b, fn(2), c]
 *
 * @param {Array} sourceArray - The array whose elements will be interleaved.
 * @param {Function} callback - a function that takes the current index and returns a value to interleave.
 * @returns {Array} a new array with the callback results interleaved between the original elements (except before the first).
 */
function interleaveWithCallbackResults(sourceArray, callback) {
  return sourceArray.flatMap((element, index) => {
    // For the first element, just return isBlobOrFileLikeObject as an array
    if (index === 0) {
      return [element];
    }
    // For subsequent elements, insert the callback result before the element
    return [callback(index), element];
  });
}

module.exports = interleaveWithCallbackResults;