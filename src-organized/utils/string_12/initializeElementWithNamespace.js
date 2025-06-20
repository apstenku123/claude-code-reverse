/**
 * Initializes an element with local name, prefix, namespace URI, and data, then sets its owner element.
 *
 * @param {object} ownerElement - The element that will own this instance.
 * @param {string} localName - The local name for the element.
 * @param {string|null} prefix - The namespace prefix. If null or empty, will be set to null.
 * @param {string|null} namespaceURI - The namespace URI. If null or empty, will be set to null.
 * @param {any} data - Arbitrary data to associate with the element.
 * @returns {void}
 */
function initializeElementWithNamespace(ownerElement, localName, prefix, namespaceURI, data) {
  // Assign the local name directly
  this.localName = localName;

  // Assign the prefix, converting empty string or null to null
  this.prefix = (prefix === null || prefix === "") ? null : String(prefix);

  // Assign the namespace URI, converting empty string or null to null
  this.namespaceURI = (namespaceURI === null || namespaceURI === "") ? null : String(namespaceURI);

  // Store the provided data
  this.data = data;

  // Set the owner element using the provided method
  this._setOwnerElement(ownerElement);
}

module.exports = initializeElementWithNamespace;