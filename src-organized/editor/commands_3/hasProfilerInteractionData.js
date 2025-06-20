/**
 * Checks if the given fiber node has profiler interaction data.
 *
 * This function determines whether the provided fiber node contains profiler-related
 * information by checking for either a non-null `memoizedInteractions` property or
 * a `current` property that has a `treeBaseDuration` property.
 *
 * @param {Object} fiberNode - The fiber node object to check for profiler data.
 * @returns {boolean} Returns true if profiler interaction data is present; otherwise, false.
 */
function hasProfilerInteractionData(fiberNode) {
  // Check if memoizedInteractions property exists and is not null
  if (fiberNode.memoizedInteractions != null) {
    return true;
  }
  // Check if current property exists and has a treeBaseDuration property
  if (
    fiberNode.current != null &&
    Object.prototype.hasOwnProperty.call(fiberNode.current, "treeBaseDuration")
  ) {
    return true;
  }
  // No profiler interaction data found
  return false;
}

module.exports = hasProfilerInteractionData;