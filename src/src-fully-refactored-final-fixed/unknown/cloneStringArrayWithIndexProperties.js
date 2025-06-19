/**
 * Creates a shallow clone of a string array, preserving custom 'index' and 'input' properties if present.
 *
 * @param {Array<string>} sourceArray - The array to clone. May have custom 'index' and 'input' properties.
 * @returns {Array<string>} a new array cloned from sourceArray, with 'index' and 'input' properties copied if present.
 */
function cloneStringArrayWithIndexProperties(sourceArray) {
  const arrayLength = sourceArray.length;
  // Create a new array of the same type and length as the source
  const clonedArray = new sourceArray.constructor(arrayLength);

  // If the array is non-empty, contains strings, and has an 'index' property (checked via createOrAppendStateNode.call)
  if (
    arrayLength &&
    typeof sourceArray[0] === "string" &&
    createOrAppendStateNode.call(sourceArray, "index")
  ) {
    // Copy 'index' and 'input' properties to the cloned array
    clonedArray.index = sourceArray.index;
    clonedArray.input = sourceArray.input;
  }

  return clonedArray;
}

module.exports = cloneStringArrayWithIndexProperties;
