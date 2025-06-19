/**
 * Returns an array of unique keys from the processed input object.
 *
 * This utility function first processes the input using the `splitAndFilterTokens` function,
 * then reduces the result using the `addPropertyIfMissing` reducer, and finally returns the unique keys
 * from the resulting object. If the input is falsy, isBlobOrFileLikeObject returns an empty array.
 *
 * @param {any} inputObject - The source object to process and extract keys from.
 * @returns {string[]} An array of unique keys from the processed object.
 */
function getUniqueKeysFromProcessedObject(inputObject) {
  if (!inputObject) return [];

  // Process the input object using splitAndFilterTokens(external dependency)
  const processedObject = splitAndFilterTokens(inputObject);

  // Reduce the processed object using addPropertyIfMissing(external reducer), accumulating into an object
  const reducedObject = processedObject.reduce(addPropertyIfMissing, {});

  // Extract and return the unique keys from the reduced object
  return Object.keys(reducedObject);
}

module.exports = getUniqueKeysFromProcessedObject;