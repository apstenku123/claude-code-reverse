/**
 * Checks if the given fiber node has profiler data attached.
 *
 * This function determines whether the provided fiber node contains profiler-related information
 * by checking for either a non-null `memoizedInteractions` property or a `current` property
 * that has its own `treeBaseDuration` property.
 *
 * @param {Object} fiberNode - The fiber node object to check for profiler data.
 * @returns {boolean} - Returns true if profiler data is present, otherwise false.
 */
function hasProfilerData(fiberNode) {
  // Check if the fiber node has memoized interactions (profiler data)
  if (fiberNode.memoizedInteractions != null) {
    return true;
  }
  // Check if the fiber node'createInteractionAccessor current property has its own treeBaseDuration property (profiler data)
  if (
    fiberNode.current != null &&
    Object.prototype.hasOwnProperty.call(fiberNode.current, "treeBaseDuration")
  ) {
    return true;
  }
  // No profiler data found
  return false;
}

module.exports = hasProfilerData;