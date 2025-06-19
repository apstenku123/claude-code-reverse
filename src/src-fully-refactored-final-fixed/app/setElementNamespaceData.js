/**
 * Sets namespace-related properties and data on an element, then assigns the owner element.
 *
 * @param {object} ownerElement - The element to which this namespace data belongs.
 * @param {string} localName - The local name of the element (without prefix).
 * @param {string|null} prefix - The namespace prefix, or null if not present.
 * @param {string|null} namespaceURI - The namespace URI, or null if not present.
 * @param {any} data - Additional data associated with the element.
 * @returns {void}
 */
function setElementNamespaceData(ownerElement, localName, prefix, namespaceURI, data) {
  // Assign the local name
  this.localName = localName;

  // Assign the prefix, ensuring null if empty or not provided
  this.prefix = (prefix === null || prefix === "") ? null : String(prefix);

  // Assign the namespace URI, ensuring null if empty or not provided
  this.namespaceURI = (namespaceURI === null || namespaceURI === "") ? null : String(namespaceURI);

  // Store additional data
  this.data = data;

  // Set the owner element for this namespace data
  this._setOwnerElement(ownerElement);
}

module.exports = setElementNamespaceData;