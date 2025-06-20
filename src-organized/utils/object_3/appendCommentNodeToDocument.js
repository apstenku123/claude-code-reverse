/**
 * Appends a comment node to the document associated with the given source object.
 *
 * @param {Object} sourceObject - The object that contains the _appendCommentNode method and a document property.
 * @param {any} commentNode - The comment node to append to the document.
 * @returns {void}
 */
function appendCommentNodeToDocument(sourceObject, commentNode) {
  // Call the internal method to append the comment node to the document
  sourceObject._appendCommentNode(commentNode, sourceObject.document);
}

module.exports = appendCommentNodeToDocument;