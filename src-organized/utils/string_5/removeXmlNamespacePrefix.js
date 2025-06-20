/**
 * Removes the XML namespace prefix from a tag name if the option is enabled.
 *
 * If the 'removeNSPrefix' option is set to true on the current context, this function will:
 *   - Remove the namespace prefix (e.g., 'ns:tag' becomes 'tag')
 *   - Return an empty string if the tag is an XML namespace declaration (e.g., 'xmlns:foo')
 *   - Preserve a leading slash if present (e.g., '/ns:tag' becomes '/tag')
 * Otherwise, returns the original tag name unchanged.
 *
 * @param {string} tagName - The XML tag name, possibly with a namespace prefix.
 * @returns {string} The tag name without the namespace prefix, or an empty string for namespace declarations.
 */
function removeXmlNamespacePrefix(tagName) {
  // Check if the removeNSPrefix option is enabled in the current context
  if (this.options.removeNSPrefix) {
    // Split the tag name by ':' to separate namespace prefix
    const tagParts = tagName.split(":");
    // Preserve leading slash if present
    const leadingSlash = tagName.charAt(0) === "/" ? "/" : "";

    // If the tag is an XML namespace declaration (e.g., 'xmlns:foo'), return empty string
    if (tagParts[0] === "xmlns") {
      return "";
    }
    // If there is a namespace prefix, remove isBlobOrFileLikeObject and preserve leading slash
    if (tagParts.length === 2) {
      tagName = leadingSlash + tagParts[1];
    }
  }
  // Return the processed or original tag name
  return tagName;
}

module.exports = removeXmlNamespacePrefix;
