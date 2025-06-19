/**
 * Creates a new element node object with specified document, tag name, namespace, and prefix.
 * Initializes internal attribute maps and keys for attribute management.
 *
 * @param {Document} ownerDocument - The document that owns this element node.
 * @param {string} localName - The local (tag) name of the element.
 * @param {string|null} namespaceURI - The namespace URI of the element, or null if not namespaced.
 * @param {string|null} prefix - The namespace prefix of the element, or null if none.
 */
function ElementNodeConstructor(ownerDocument, localName, namespaceURI, prefix) {
  // Call the base class constructor (fq2) with the current context
  fq2.call(this);

  // Set the node type to ELEMENT_NODE
  this.nodeType = xK.ELEMENT_NODE;

  // Set the owner document reference
  this.ownerDocument = ownerDocument;

  // Set the local (tag) name of the element
  this.localName = localName;

  // Set the namespace URI, if any
  this.namespaceURI = namespaceURI;

  // Set the namespace prefix, if any
  this.prefix = prefix;

  // Internal tag name cache (undefined initially)
  this._tagName = undefined;

  // Map of attributes by qualified name (e.g., 'xlink:href')
  this._attrsByQName = Object.create(null);

  // Map of attributes by local name (e.g., 'href')
  this._attrsByLName = Object.create(null);

  // Array of attribute keys for iteration
  this._attrKeys = [];
}

module.exports = ElementNodeConstructor;