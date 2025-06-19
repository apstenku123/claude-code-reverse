/**
 * Extracts the underlying instance (stateNode) and its style object from a React Fiber node.
 *
 * @param {any} element - The element or node from which to extract the instance and style.
 * @returns {{ instance: any, style: any }} An object containing the instance (stateNode) and the style object (if present).
 */
function extractInstanceAndStyle(element) {
  // Attempt to retrieve the Fiber node associated with the input element
  const fiberNode = findMountedFiberById(element);
  let instance = null;
  let style = null;

  if (fiberNode !== null) {
    // The underlying instance (stateNode) of the Fiber node
    instance = fiberNode.stateNode;
    // If memoizedProps exists, extract the style property
    if (fiberNode.memoizedProps !== null) {
      style = fiberNode.memoizedProps.style;
    }
  }

  return {
    instance: instance,
    style: style
  };
}

module.exports = extractInstanceAndStyle;