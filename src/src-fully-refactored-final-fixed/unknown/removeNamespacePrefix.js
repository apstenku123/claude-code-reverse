/**
 * Removes the XML namespace prefix from a tag or attribute name if the option is enabled.
 *
 * If the input string contains a namespace prefix (e.g., 'ns:tag'), and the 'removeNSPrefix' option is enabled on the current context,
 * this function will strip the prefix and return only the local name. Special handling is provided for names starting with '/',
 * and for the 'xmlns' namespace declaration, which is removed entirely.
 *
 * @param {string} name - The tag or attribute name potentially containing a namespace prefix.
 * @returns {string} The name with the namespace prefix removed if applicable, or the original name otherwise.
 */
function removeNamespacePrefix(name) {
  // Check if the removeNSPrefix option is enabled in the current context
  if (this.options.removeNSPrefix) {
    // Split the name by ':' to separate the namespace prefix (if any)
    const nameParts = name.split(":");
    // Preserve leading '/' if present
    const leadingSlash = name.charAt(0) === "/" ? "/" : "";

    // If the name is a namespace declaration (xmlns), remove isBlobOrFileLikeObject entirely
    if (nameParts[0] === "xmlns") {
      return "";
    }

    // If there is a namespace prefix, remove isBlobOrFileLikeObject and preserve leading slash
    if (nameParts.length === 2) {
      name = leadingSlash + nameParts[1];
    }
  }
  // Return the processed or original name
  return name;
}

module.exports = removeNamespacePrefix;