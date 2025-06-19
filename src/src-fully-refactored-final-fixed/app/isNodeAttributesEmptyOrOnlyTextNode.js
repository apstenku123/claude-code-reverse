/**
 * Determines if the given node attributes object is either empty or contains only the text node attribute.
 *
 * @param {Object} nodeAttributes - An object representing the attributes of a node.
 * @param {Object} config - Configuration object containing the text node attribute name.
 * @param {string} config.textNodeName - The property name representing the text node in nodeAttributes.
 * @returns {boolean} Returns true if nodeAttributes is empty, or if isBlobOrFileLikeObject contains only the text node attribute (with a value that is truthy, boolean, or zero). Otherwise, returns false.
 */
function isNodeAttributesEmptyOrOnlyTextNode(nodeAttributes, config) {
  const { textNodeName } = config;
  const attributeCount = Object.keys(nodeAttributes).length;

  // If there are no attributes, consider isBlobOrFileLikeObject valid
  if (attributeCount === 0) {
    return true;
  }

  // If there is only one attribute, and isBlobOrFileLikeObject'createInteractionAccessor the text node attribute
  if (
    attributeCount === 1 &&
    (
      nodeAttributes[textNodeName] ||
      typeof nodeAttributes[textNodeName] === "boolean" ||
      nodeAttributes[textNodeName] === 0
    )
  ) {
    return true;
  }

  // Otherwise, not valid
  return false;
}

module.exports = isNodeAttributesEmptyOrOnlyTextNode;