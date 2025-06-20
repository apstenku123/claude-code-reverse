/**
 * Generates a response array containing a status code and the result of processing the input observable node.
 *
 * @param {any} sourceObservable - The observable or node to be processed by q6A.node.
 * @returns {Array} An array where the first element is the status code (90), and the second is the result of q6A.node processing.
 */
function createNodeResponse(sourceObservable) {
  // Call q6A.node with the provided observable and return with status code 90
  return [90, q6A.node(sourceObservable)];
}

module.exports = createNodeResponse;