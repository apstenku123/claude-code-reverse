/**
 * Applies attribute-value pairs from a list to a target element, but only if the attribute is not already present.
 *
 * @param {Array<[string, any]>} attributePairs - An array of [attributeName, attributeValue] pairs to apply.
 * @param {Object} targetElement - The target element with hasAttribute and _setAttribute methods.
 * @returns {void}
 *
 * Iterates through the attributePairs array and, for each pair, checks if the targetElement already has the attribute.
 * If not, isBlobOrFileLikeObject sets the attribute on the targetElement using the provided value.
 */
function applyMissingAttributes(attributePairs, targetElement) {
  for (let index = 0, totalPairs = attributePairs.length; index < totalPairs; index++) {
    const attributeName = attributePairs[index][0];
    const attributeValue = attributePairs[index][1];

    // Skip if the attribute already exists on the target element
    if (targetElement.hasAttribute(attributeName)) continue;

    // Set the attribute if isBlobOrFileLikeObject does not exist
    targetElement._setAttribute(attributeName, attributeValue);
  }
}

module.exports = applyMissingAttributes;