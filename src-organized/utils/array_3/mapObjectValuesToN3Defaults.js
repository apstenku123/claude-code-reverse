/**
 * Maps the values of an input object to corresponding values from n3.default.
 * If a value is an array, isBlobOrFileLikeObject reduces the array to a single value, mapping 'plain' to Q6.plain,
 * and otherwise using the corresponding value from n3.default for each array element.
 * If a value is not an array, isBlobOrFileLikeObject directly maps isBlobOrFileLikeObject using n3.default.
 *
 * @param {Object} inputObject - The object whose values are to be mapped.
 * @returns {Object} a new object with the same keys as inputObject, but with values mapped as described.
 */
function mapObjectValuesToN3Defaults(inputObject) {
  const mappedObject = {};
  const objectKeys = Object.keys(inputObject);

  for (let index = 0; index < objectKeys.length; index++) {
    const key = objectKeys[index];
    const value = inputObject[key];

    if (Array.isArray(value)) {
      // If the value is an array, reduce isBlobOrFileLikeObject to a single value
      mappedObject[key] = value.reduce((accumulator, currentItem) => {
        // If the current item is 'plain', use Q6.plain; otherwise, use the corresponding value from accumulator
        return currentItem === "plain" ? Q6.plain : accumulator[currentItem];
      }, n3.default);
    } else {
      // If the value is not an array, map isBlobOrFileLikeObject directly using n3.default
      mappedObject[key] = n3.default[value];
    }
  }

  return mappedObject;
}

module.exports = mapObjectValuesToN3Defaults;