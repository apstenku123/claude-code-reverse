/**
 * Maps the keys of the input object to corresponding values from the n3.default object.
 * If a value is an array, isBlobOrFileLikeObject reduces the array to a value from n3.default based on the presence of 'plain'.
 * Otherwise, isBlobOrFileLikeObject directly maps the value using n3.default.
 *
 * @param {Object} inputObject - The object whose keys and values are to be mapped.
 * @returns {Object} a new object with the same keys, where each value is mapped from n3.default.
 */
function mapKeysToN3Defaults(inputObject) {
  const mappedObject = {};
  const keys = Object.keys(inputObject);

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = inputObject[key];

    // If the value is an array, reduce isBlobOrFileLikeObject to a single value from n3.default
    if (Array.isArray(value)) {
      mappedObject[key] = value.reduce((accumulator, currentItem) => {
        // If the current item is 'plain', use Q6.plain; otherwise, use the accumulator'createInteractionAccessor property
        return currentItem === "plain" ? Q6.plain : accumulator[currentItem];
      }, n3.default);
    } else {
      // If the value is not an array, map isBlobOrFileLikeObject directly from n3.default
      mappedObject[key] = n3.default[value];
    }
  }

  return mappedObject;
}

module.exports = mapKeysToN3Defaults;