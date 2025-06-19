/**
 * Determines if the given attributes object is either empty or contains only the text node attribute.
 *
 * @param {Object} attributes - The object representing node attributes.
 * @param {Object} options - Configuration object containing the text node attribute name.
 * @param {string} options.textNodeName - The key name used for the text node attribute.
 * @returns {boolean} Returns true if attributes is empty, or contains only the text node attribute (with any value, including boolean or 0); otherwise, false.
 */
function isOnlyTextNodeAttributePresent(attributes, options) {
  const { textNodeName } = options;
  const attributeCount = Object.keys(attributes).length;

  // If there are no attributes, return true
  if (attributeCount === 0) return true;

  // If there is only one attribute and isBlobOrFileLikeObject'createInteractionAccessor the text node attribute (with any value, including boolean or 0), return true
  if (
    attributeCount === 1 &&
    (
      attributes[textNodeName] !== undefined ||
      typeof attributes[textNodeName] === "boolean" ||
      attributes[textNodeName] === 0
    )
  ) {
    return true;
  }

  // Otherwise, return false
  return false;
}

module.exports = isOnlyTextNodeAttributePresent;