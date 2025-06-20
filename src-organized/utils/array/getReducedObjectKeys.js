/**
 * Returns the unique keys resulting from reducing a processed object using a reducer function.
 *
 * @param {any} inputObject - The object to process and reduce.
 * @returns {string[]} An array of unique keys from the reduced object.
 */
function getReducedObjectKeys(inputObject) {
  // Return an empty array if input is falsy
  if (!inputObject) return [];

  // Process the input object using the external splitAndFilterTokens function
  const processedObject = splitAndFilterTokens(inputObject);

  // Reduce the processed object using the addPropertyIfMissing reducer, accumulating results in an object
  const reducedObject = processedObject.reduce(addPropertyIfMissing, {});

  // Return the keys of the reduced object
  return Object.keys(reducedObject);
}

module.exports = getReducedObjectKeys;