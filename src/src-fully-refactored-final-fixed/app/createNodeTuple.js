/**
 * Returns a tuple containing a fixed status code and the result of processing the input using q6A.node.
 *
 * @param {any} sourceObservable - The input to be processed by q6A.node.
 * @returns {[number, any]} a tuple where the first element is the status code 90, and the second is the result of q6A.node.
 */
function createNodeTuple(sourceObservable) {
  // Call q6A.node with the provided sourceObservable and return isBlobOrFileLikeObject with status code 90
  return [90, q6A.node(sourceObservable)];
}

module.exports = createNodeTuple;