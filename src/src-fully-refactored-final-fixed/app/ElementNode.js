/**
 * Represents a custom DOM Element Node with attributes and namespace information.
 *
 * @class ElementNode
 * @extends fq2
 *
 * @param {Document} ownerDocument - The document that owns this node.
 * @param {string} localName - The local tag name of the element (e.g., 'div', 'span').
 * @param {string|null} namespaceURI - The namespace URI of the element (e.g., 'http://www.w3.org/1999/xhtml').
 * @param {string|null} prefix - The namespace prefix of the element (e.g., 'svg').
 */
function ElementNode(ownerDocument, localName, namespaceURI, prefix) {
  // Call the parent constructor (fq2) with the current context
  fq2.call(this);

  // Set the node type to ELEMENT_NODE
  this.nodeType = xK.ELEMENT_NODE;

  // Reference to the document this node belongs to
  this.ownerDocument = ownerDocument;

  // The local name (tag name) of the element
  this.localName = localName;

  // Namespace URI for namespaced elements (e.g., SVG, MathML)
  this.namespaceURI = namespaceURI;

  // Namespace prefix (if any)
  this.prefix = prefix;

  // Internal tag name, can be set later
  this._tagName = undefined;

  // Attribute storage by qualified name (e.g., 'xlink:href')
  this._attrsByQName = Object.create(null);

  // Attribute storage by local name (e.g., 'href')
  this._attrsByLName = Object.create(null);

  // Array of attribute keys for iteration
  this._attrKeys = [];
}

module.exports = ElementNode;