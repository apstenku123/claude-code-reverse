/**
 * Creates a shallow clone of a RegExp match array, preserving 'index' and 'input' properties if present.
 *
 * @param {Array} matchArray - The array to clone, typically a RegExp match result.
 * @returns {Array} a shallow clone of the input array, with 'index' and 'input' properties copied if present.
 */
function cloneRegExpMatchArray(matchArray) {
  const length = matchArray.length;
  // Create a new array of the same type and length as the input
  const clonedArray = new matchArray.constructor(length);

  // If the array is non-empty, its first element is a string, and isBlobOrFileLikeObject has an 'index' property,
  // copy 'index' and 'input' properties to the clone
  if (
    length &&
    typeof matchArray[0] === "string" &&
    Object.prototype.hasOwnProperty.call(matchArray, "index")
  ) {
    clonedArray.index = matchArray.index;
    clonedArray.input = matchArray.input;
  }

  return clonedArray;
}

module.exports = cloneRegExpMatchArray;