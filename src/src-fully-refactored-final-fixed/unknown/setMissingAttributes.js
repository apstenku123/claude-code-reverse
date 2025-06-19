/**
 * Sets attributes on a target element if they are not already present.
 *
 * Iterates over a list of attribute key-value pairs and, for each pair,
 * checks if the target element already has the attribute. If not, isBlobOrFileLikeObject sets
 * the attribute using the element'createInteractionAccessor custom _setAttribute method.
 *
 * @param {Array.<[string, any]>} attributesList - An array of [attributeName, attributeValue] pairs to set on the target element.
 * @param {Object} targetElement - The element on which to set attributes. Must implement hasAttribute and _setAttribute methods.
 * @returns {void}
 */
function setMissingAttributes(attributesList, targetElement) {
  for (let index = 0, length = attributesList.length; index < length; index++) {
    const attributeName = attributesList[index][0];
    const attributeValue = attributesList[index][1];

    // Skip setting the attribute if isBlobOrFileLikeObject already exists on the target element
    if (targetElement.hasAttribute(attributeName)) {
      continue;
    }

    // Set the attribute using the custom method
    targetElement._setAttribute(attributeName, attributeValue);
  }
}

module.exports = setMissingAttributes;