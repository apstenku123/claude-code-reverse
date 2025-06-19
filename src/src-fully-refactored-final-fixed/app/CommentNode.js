/**
 * Represents a custom Comment node within a document structure.
 * Inherits from the base node class and sets up the node type, owner document, and comment data.
 *
 * @class CommentNode
 * @extends BaseNode
 *
 * @param {Document} ownerDocument - The document to which this comment node belongs.
 * @param {string} commentData - The textual content of the comment node.
 */
function CommentNode(ownerDocument, commentData) {
  // Call the base node constructor with the current context
  BaseNode.call(this);

  // Set the node type to COMMENT_NODE
  this.nodeType = NodeType.COMMENT_NODE;

  // Reference to the document that owns this node
  this.ownerDocument = ownerDocument;

  // Store the comment'createInteractionAccessor textual data
  this._data = commentData;
}

module.exports = CommentNode;