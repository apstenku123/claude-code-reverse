/**
 * Retrieves the result of an optional chain operation on the provided source object.
 * If the result is null or undefined, returns true; otherwise, returns the result.
 *
 * @param {any} sourceObject - The object to apply the optional chain operation to.
 * @returns {any} - The result of the optional chain, or true if the result is null or undefined.
 */
function getOptionalChainOrTrue(sourceObject) {
  // Apply the optional chain operation using vl2._optionalChain
  const optionalChainResult = vl2._optionalChain(sourceObject);
  // If the result is null or undefined, return true; otherwise, return the result
  return optionalChainResult == null ? true : optionalChainResult;
}

module.exports = getOptionalChainOrTrue;