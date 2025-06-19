/**
 * Extracts the attribute name without the configured prefix, if applicable.
 *
 * @param {string} attributeName - The full attribute name to process.
 * @returns {string|boolean} The attribute name without the prefix, or false if the prefix is not present or the name matches the text node name.
 */
function getAttributeNameWithoutPrefix(attributeName) {
  // Check if the attribute name starts with the configured prefix and is not the text node name
  if (
    attributeName.startsWith(this.options.attributeNamePrefix) &&
    attributeName !== this.options.textNodeName
  ) {
    // Remove the prefix from the attribute name and return the result
    return attributeName.substr(this.attrPrefixLen);
  } else {
    // Return false if the prefix is not present or the name matches the text node name
    return false;
  }
}

module.exports = getAttributeNameWithoutPrefix;