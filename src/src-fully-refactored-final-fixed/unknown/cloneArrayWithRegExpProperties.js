/**
 * Creates a shallow clone of an array-like object, preserving special RegExp properties if present.
 *
 * If the input is a RegExp match array (i.e., an array where the first element is a string and isBlobOrFileLikeObject has 'index' property),
 * the returned clone will also have the 'index' and 'input' properties copied over.
 *
 * @param {Array} sourceArray - The array-like object to clone. May be a RegExp match array.
 * @returns {Array} a shallow clone of the input array, with RegExp properties preserved if present.
 */
function cloneArrayWithRegExpProperties(sourceArray) {
  const arrayLength = sourceArray.length;
  // Create a new array of the same type and length as the source
  const clonedArray = new sourceArray.constructor(arrayLength);

  // If the array is non-empty, the first element is a string, and isBlobOrFileLikeObject has an 'index' property (RegExp match array)
  if (
    arrayLength &&
    typeof sourceArray[0] === "string" &&
    Tf2.call(sourceArray, "index")
  ) {
    // Copy RegExp match properties
    clonedArray.index = sourceArray.index;
    clonedArray.input = sourceArray.input;
  }

  return clonedArray;
}

module.exports = cloneArrayWithRegExpProperties;