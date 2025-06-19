/**
 * Initializes the namespace-related properties for an element and sets its owner element.
 *
 * @param {Object} ownerElement - The element to which this namespace data belongs.
 * @param {string} localName - The local name of the element (without prefix).
 * @param {string|null} prefix - The namespace prefix, or null if not provided.
 * @param {string|null} namespaceURI - The namespace URI, or null if not provided.
 * @param {any} data - Additional data associated with the element.
 * @returns {void}
 */
function initializeElementNamespaceData(ownerElement, localName, prefix, namespaceURI, data) {
  // Assign the local name directly
  this.localName = localName;

  // If prefix is null or an empty string, set to null; otherwise, convert to string
  this.prefix = (prefix === null || prefix === "") ? null : String(prefix);

  // If namespaceURI is null or an empty string, set to null; otherwise, convert to string
  this.namespaceURI = (namespaceURI === null || namespaceURI === "") ? null : String(namespaceURI);

  // Store additional data
  this.data = data;

  // Set the owner element using the provided method
  this._setOwnerElement(ownerElement);
}

module.exports = initializeElementNamespaceData;