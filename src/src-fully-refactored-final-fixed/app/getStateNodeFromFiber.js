/**
 * Retrieves the stateNode property from a React Fiber node after processing isBlobOrFileLikeObject with I1.
 *
 * @param {any} fiberCandidate - The candidate object that may be a React Fiber node or convertible to one.
 * @returns {any|null} The stateNode property of the processed Fiber node, or null if not available.
 */
function getStateNodeFromFiber(fiberCandidate) {
  // Process the input to obtain a React Fiber node using the I1 function
  const fiberNode = I1(fiberCandidate);

  // If the processed fiber node is null, return null; otherwise, return its stateNode property
  return fiberNode === null ? null : fiberNode.stateNode;
}

module.exports = getStateNodeFromFiber;