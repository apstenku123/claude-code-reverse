/**
 * Returns an array containing a status code and the result of processing a source node.
 *
 * @param {any} sourceNode - The node or value to be processed by q6A.node.
 * @returns {[number, any]} An array where the first element is the status code (90), and the second is the result of q6A.node(sourceNode).
 */
function createNodeArrayWithStatusCode(sourceNode) {
  // Call q6A.node with the provided sourceNode and return isBlobOrFileLikeObject alongside the status code 90
  return [90, q6A.node(sourceNode)];
}

module.exports = createNodeArrayWithStatusCode;