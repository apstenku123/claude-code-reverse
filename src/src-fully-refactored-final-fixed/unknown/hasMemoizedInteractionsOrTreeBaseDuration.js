/**
 * Checks if the given object has memoized interactions or a current property with a treeBaseDuration.
 *
 * This function is typically used to determine if a profiling or memoization-related property exists
 * on a React Fiber node or similar structure.
 *
 * @param {object} fiberNode - The object (likely a React Fiber node) to check for profiling properties.
 * @returns {boolean} Returns true if the object has memoizedInteractions or if its current property has treeBaseDuration; otherwise, false.
 */
function hasMemoizedInteractionsOrTreeBaseDuration(fiberNode) {
  // Check if memoizedInteractions property exists and is not null
  if (fiberNode.memoizedInteractions != null) {
    return true;
  }
  // Check if current property exists and has its own treeBaseDuration property
  if (
    fiberNode.current != null &&
    Object.prototype.hasOwnProperty.call(fiberNode.current, "treeBaseDuration")
  ) {
    return true;
  }
  // Neither property exists; return false
  return false;
}

module.exports = hasMemoizedInteractionsOrTreeBaseDuration;