/**
 * Concatenates the 'code' property from each object in the provided array into a single string.
 *
 * @param {Array<{code: string}>} objectsArray - An array of objects, each containing a 'code' property (string).
 * @returns {string} a single string resulting from the concatenation of all 'code' properties.
 */
function concatenateCodesFromObjects(objectsArray) {
  // Map over the array to extract the 'code' property from each object
  const codes = objectsArray.map(objectWithCode => objectWithCode.code);
  // Join all codes into a single string
  return codes.join("");
}

module.exports = concatenateCodesFromObjects;
