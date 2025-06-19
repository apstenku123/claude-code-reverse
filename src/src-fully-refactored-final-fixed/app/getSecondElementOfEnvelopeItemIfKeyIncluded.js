/**
 * Retrieves the second element of the first envelope item whose key is included in the provided keys array.
 *
 * Iterates over each envelope item in the source object using YN1.forEachEnvelopeItem. If the item'createInteractionAccessor key is found in the keysToMatch array, and the item is an array, returns its second element (index 1). Stops iterating once a match is found.
 *
 * @param {Object} envelopeSource - The source object containing envelope items to iterate over.
 * @param {Array<string>} keysToMatch - An array of keys to check for inclusion.
 * @returns {any} The second element of the matching envelope item array, or undefined if no match is found.
 */
function getSecondElementOfEnvelopeItemIfKeyIncluded(envelopeSource, keysToMatch) {
  let secondElement;
  // Iterate over each envelope item in the source
  YN1.forEachEnvelopeItem(envelopeSource, (item, key) => {
    // Check if the current key is in the keysToMatch array
    if (keysToMatch.includes(key)) {
      // If the item is an array, retrieve its second element
      secondElement = Array.isArray(item) ? item[1] : undefined;
    }
    // If a matching second element is found, stop further iteration
    return !!secondElement;
  });
  return secondElement;
}

module.exports = getSecondElementOfEnvelopeItemIfKeyIncluded;