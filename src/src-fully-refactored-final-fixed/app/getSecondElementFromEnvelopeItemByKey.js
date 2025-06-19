/**
 * Retrieves the second element from the first envelope item whose key is included in the provided key list.
 *
 * Iterates over all envelope items in the given source object. For each item, if its key is present in the targetKeys array,
 * and the item is an array, returns the second element of that array. Stops iteration as soon as a match is found.
 *
 * @param {Object} envelopeSource - The source object containing envelope items to iterate over.
 * @param {Array<string>} targetKeys - An array of keys to match against envelope item keys.
 * @returns {any} The second element of the first matching envelope item array, or undefined if no match is found.
 */
function getSecondElementFromEnvelopeItemByKey(envelopeSource, targetKeys) {
  let secondElement;
  // Iterate over each envelope item in the source
  YN1.forEachEnvelopeItem(envelopeSource, (itemValue, itemKey) => {
    // Check if the current key is in the list of target keys
    if (targetKeys.includes(itemKey)) {
      // If the item value is an array, retrieve its second element
      secondElement = Array.isArray(itemValue) ? itemValue[1] : undefined;
    }
    // Stop iteration early if a matching item has been found
    return !!secondElement;
  });
  return secondElement;
}

module.exports = getSecondElementFromEnvelopeItemByKey;