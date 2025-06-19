/**
 * Determines whether a namespace declaration should be added for a given XML element.
 *
 * @param {Object} element - The XML element object containing namespace information.
 * @param {Object} context - (Unused) Additional context or configuration object.
 * @param {Array<Object>} namespaceStack - Stack of namespace declarations currently in scope.
 * @returns {boolean} True if the namespace should be declared, false otherwise.
 */
function shouldDeclareNamespace(element, context, namespaceStack) {
  const prefix = element.prefix || "";
  const namespaceURI = element.namespaceURI;

  // If there is no namespace URI, no declaration is needed
  if (!namespaceURI) {
    return false;
  }

  // Prevent redeclaring the standard XML or XMLNS namespaces
  if ((prefix === "xml" && namespaceURI === H11.XML) || namespaceURI === H11.XMLNS) {
    return false;
  }

  // Check if a namespace with the same prefix is already declared in the stack
  for (let i = namespaceStack.length - 1; i >= 0; i--) {
    const declaredNamespace = namespaceStack[i];
    if (declaredNamespace.prefix === prefix) {
      // If the same prefix is found, only declare if the URI is different
      return declaredNamespace.namespace !== namespaceURI;
    }
  }

  // If no matching prefix was found, the namespace should be declared
  return true;
}

module.exports = shouldDeclareNamespace;