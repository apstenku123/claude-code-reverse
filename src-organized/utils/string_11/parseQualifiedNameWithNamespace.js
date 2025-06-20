/**
 * Parses a qualified XML name with an optional namespace, validates isBlobOrFileLikeObject, and returns its components.
 *
 * @param {string|null} namespace - The namespace URI, or an empty string/null if not specified.
 * @param {string} qualifiedName - The qualified XML name (may include a prefix, e.g., 'svg:rect').
 * @returns {{namespace: string|null, prefix: string|null, localName: string}} An object containing the namespace, prefix, and localName.
 * @throws {InvalidCharacterError} If the qualifiedName is not a valid QName.
 * @throws {NamespaceError} If the namespace and qualifiedName combination is invalid per XML Namespaces spec.
 */
function parseQualifiedNameWithNamespace(namespace, qualifiedName) {
  let prefix = null;
  let localName = qualifiedName;

  // Treat empty string namespace as null
  if (namespace === "") {
    namespace = null;
  }

  // Validate the qualified name using external QName validator
  if (!TH1.isValidQName(qualifiedName)) {
    U5.InvalidCharacterError();
  }

  // Split qualifiedName into prefix and localName if a colon is present
  const colonIndex = qualifiedName.indexOf(":");
  if (colonIndex >= 0) {
    prefix = qualifiedName.substring(0, colonIndex);
    localName = qualifiedName.substring(colonIndex + 1);
  }

  // Enforce XML namespace rules
  if (prefix !== null && namespace === null) {
    // a prefix is present but no namespace is provided
    U5.NamespaceError();
  }
  if (prefix === "xml" && namespace !== Pu.XML) {
    // The 'xml' prefix must be bound to the XML namespace
    U5.NamespaceError();
  }
  if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== Pu.XMLNS) {
    // The 'xmlns' prefix or name must be bound to the XMLNS namespace
    U5.NamespaceError();
  }
  if (namespace === Pu.XMLNS && !(prefix === "xmlns" || qualifiedName === "xmlns")) {
    // The XMLNS namespace must only be used with the 'xmlns' prefix or name
    U5.NamespaceError();
  }

  return {
    namespace: namespace,
    prefix: prefix,
    localName: localName
  };
}

module.exports = parseQualifiedNameWithNamespace;