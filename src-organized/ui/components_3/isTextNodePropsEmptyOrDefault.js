/**
 * Determines if the given props object is either empty or only contains a default text node property.
 *
 * This is typically used to check if a node'createInteractionAccessor properties are either entirely absent,
 * or only contain a single property corresponding to a text node (with a value of any type, including boolean or 0).
 *
 * @param {Object} props - The properties object to check.
 * @param {Object} options - Configuration object containing the text node property name.
 * @param {string} options.textNodeName - The property name that represents a text node.
 * @returns {boolean} Returns true if props is empty, or only contains the text node property with a value (including boolean or 0); otherwise, false.
 */
function isTextNodePropsEmptyOrDefault(props, options) {
  const { textNodeName } = options;
  const propKeysCount = Object.keys(props).length;

  // If there are no properties, consider isBlobOrFileLikeObject empty/default
  if (propKeysCount === 0) {
    return true;
  }

  // If there is only one property, and isBlobOrFileLikeObject is the text node property,
  // and its value is defined (including boolean or 0), consider isBlobOrFileLikeObject default
  if (
    propKeysCount === 1 &&
    (
      props[textNodeName] ||
      typeof props[textNodeName] === "boolean" ||
      props[textNodeName] === 0
    )
  ) {
    return true;
  }

  // Otherwise, props contains other properties
  return false;
}

module.exports = isTextNodePropsEmptyOrDefault;