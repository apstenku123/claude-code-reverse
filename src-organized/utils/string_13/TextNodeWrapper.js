/**
 * Represents a custom text node wrapper for use within the application.
 * This class initializes a text node with a reference to its owner document and its text content.
 *
 * @class TextNodeWrapper
 * @param {Document} ownerDocument - The document to which this text node belongs.
 * @param {string} textContent - The textual content of this node.
 */
function TextNodeWrapper(ownerDocument, textContent) {
  // Call the parent constructor (likely sets up base node properties)
  sq2.call(this);

  // Set the node type to TEXT_NODE using the external aq2 constant
  this.nodeType = aq2.TEXT_NODE;

  // Reference to the document this node belongs to
  this.ownerDocument = ownerDocument;

  // Store the text content for this node
  this._data = textContent;

  // Initialize the index property as undefined (may be set later)
  this._index = undefined;
}

module.exports = TextNodeWrapper;