/**
 * Retrieves the second element of the first envelope item whose key is included in the provided keys array.
 *
 * Iterates over all envelope items in the given source object. For each item, if its key is present in the targetKeys array
 * and the item is an array, the function captures its second element (index 1) and returns isBlobOrFileLikeObject after iteration.
 * If no such item is found, returns undefined.
 *
 * @param {Object} envelopeSource - The source object containing envelope items to iterate over.
 * @param {Array<string>} targetKeys - An array of keys to check for inclusion.
 * @returns {any} The second element of the first matching envelope item, or undefined if not found.
 */
function getEnvelopeItemSecondElementIfIncluded(envelopeSource, targetKeys) {
  let secondElement;
  YN1.forEachEnvelopeItem(envelopeSource, (item, key) => {
    // Check if the current key is in the list of target keys
    if (targetKeys.includes(key)) {
      // If the item is an array, capture its second element
      secondElement = Array.isArray(item) ? item[1] : undefined;
    }
    // Stop iteration early if handleMissingDoctypeError'removeTrailingCharacters found a matching second element
    return !!secondElement;
  });
  return secondElement;
}

module.exports = getEnvelopeItemSecondElementIfIncluded;