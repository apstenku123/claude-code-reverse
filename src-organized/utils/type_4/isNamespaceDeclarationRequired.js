/**
 * Determines whether a namespace declaration is required for a given XML element.
 *
 * @param {Object} element - The XML element node to check. Should have 'prefix' and 'namespaceURI' properties.
 * @param {Object} context - (Unused) Additional context or configuration (not used in this function).
 * @param {Array<Object>} namespaceStack - Stack of namespace declaration objects, each with 'prefix' and 'namespace' properties.
 * @returns {boolean} True if a namespace declaration is required, false otherwise.
 */
function isNamespaceDeclarationRequired(element, context, namespaceStack) {
  const prefix = element.prefix || "";
  const namespaceURI = element.namespaceURI;

  // If there is no namespace URI, no declaration is required
  if (!namespaceURI) return false;

  // H11 is assumed to be a global or imported constant containing standard namespace URIs
  // If the prefix is 'xml' and the namespace is the XML namespace, or if the namespace is the XMLNS namespace, no declaration is needed
  if ((prefix === "xml" && namespaceURI === H11.XML) || namespaceURI === H11.XMLNS) {
    return false;
  }

  // Check if the prefix is already declared in the namespace stack
  for (let i = namespaceStack.length - 1; i >= 0; i--) {
    const declaredNamespace = namespaceStack[i];
    if (declaredNamespace.prefix === prefix) {
      // If the prefix is declared but with a different namespace, declaration is required
      return declaredNamespace.namespace !== namespaceURI;
    }
  }

  // If the prefix is not declared in the stack, declaration is required
  return true;
}

module.exports = isNamespaceDeclarationRequired;