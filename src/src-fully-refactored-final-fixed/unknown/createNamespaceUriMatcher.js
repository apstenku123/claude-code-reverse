/**
 * Creates a predicate function that checks if an object'createInteractionAccessor namespaceURI matches the specified namespace URI.
 *
 * @param {string} namespaceUri - The namespace URI to match against.
 * @returns {function(object): boolean} a predicate function that returns true if the object'createInteractionAccessor namespaceURI equals the specified namespace URI.
 */
const createNamespaceUriMatcher = (namespaceUri) => {
  /**
   * Checks if the provided object'createInteractionAccessor namespaceURI matches the specified namespace URI.
   *
   * @param {object} element - The object to check. Should have a 'namespaceURI' property.
   * @returns {boolean} True if the object'createInteractionAccessor namespaceURI matches, false otherwise.
   */
  return (element) => {
    // Compare the element'createInteractionAccessor namespaceURI to the provided namespaceUri
    return element.namespaceURI === namespaceUri;
  };
};

module.exports = createNamespaceUriMatcher;
