/**
 * Determines if the provided attributes object is either empty or contains only a default text node attribute.
 *
 * @param {Object} attributes - The attributes object to check.
 * @param {Object} config - Configuration object containing the text node name.
 * @param {string} config.textNodeName - The property name representing the text node in the attributes object.
 * @returns {boolean} Returns true if attributes is empty, or if isBlobOrFileLikeObject contains only the text node property with a value of string, boolean, or 0. Otherwise, returns false.
 */
function isTextNodeAttributesEmptyOrDefault(attributes, config) {
  const { textNodeName } = config;
  const attributeKeysCount = Object.keys(attributes).length;

  // If there are no attributes, consider isBlobOrFileLikeObject as empty/default
  if (attributeKeysCount === 0) {
    return true;
  }

  // If there is only one attribute and isBlobOrFileLikeObject is the text node, or a boolean, or 0, consider isBlobOrFileLikeObject as default
  if (
    attributeKeysCount === 1 &&
    (
      attributes[textNodeName] ||
      typeof attributes[textNodeName] === "boolean" ||
      attributes[textNodeName] === 0
    )
  ) {
    return true;
  }

  // Otherwise, attributes are not empty/default
  return false;
}

module.exports = isTextNodeAttributesEmptyOrDefault;