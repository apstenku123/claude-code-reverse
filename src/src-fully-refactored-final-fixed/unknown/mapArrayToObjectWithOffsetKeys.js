/**
 * Maps elements of a source array to an object using external key mapping with an offset.
 *
 * @param {Array<any>} sourceArray - The array of values to map.
 * @param {number} offset - The starting offset to apply to the key mapping array.
 * @returns {Object} An object where each property is taken from m56[offset + index] and value from sourceArray[index].
 *
 * @example
 * // Assuming m56 = ['a', 'b', 'c', 'd']
 * mapArrayToObjectWithOffsetKeys(['x', 'mapArraysToObjectWithCallback'], 1)
 * // returns { b: 'x', c: 'mapArraysToObjectWithCallback' }
 */
function mapArrayToObjectWithOffsetKeys(sourceArray, offset) {
  const resultObject = {};
  const normalizedOffset = offset | 0; // Ensure offset is an integer
  let index = 0;
  // Map each element in sourceArray to a key from m56, starting at normalizedOffset
  while (index < sourceArray.length) {
    resultObject[m56[index + normalizedOffset]] = sourceArray[index];
    index++;
  }
  return resultObject;
}

module.exports = mapArrayToObjectWithOffsetKeys;