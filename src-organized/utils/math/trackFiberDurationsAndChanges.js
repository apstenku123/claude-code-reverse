/**
 * Tracks and records the durations and change descriptions for a given Fiber node during profiling.
 *
 * This function updates the tree base duration map, records durations for the profiler,
 * and, if enabled, tracks change descriptions for the Fiber node and its alternate.
 *
 * @param {Object} fiberNode - The Fiber node to process. Should have properties like actualDuration, treeBaseDuration, alternate, child, sibling, etc.
 * @returns {void}
 */
function trackFiberDurationsAndChanges(fiberNode) {
  // Get a unique key for this Fiber node
  const fiberKey = evaluateOrFallback(fiberNode);
  const actualDuration = fiberNode.actualDuration;
  const treeBaseDuration = fiberNode.treeBaseDuration;

  // Update the tree base duration map for this Fiber
  Ep.set(fiberKey, treeBaseDuration || 0);

  // Only proceed if profiling is enabled
  if (CY) {
    const alternateFiber = fiberNode.alternate;

    // If alternate is missing or tree base duration has changed, log the update
    if (
      alternateFiber == null ||
      treeBaseDuration !== alternateFiber.treeBaseDuration
    ) {
      // Convert duration to microseconds (assuming ms input)
      const treeBaseDurationMicroseconds = Math.floor((treeBaseDuration || 0) * 1000);
      S5(M); // Log marker (purpose of M depends on context)
      S5(fiberKey); // Log the fiber key
      S5(treeBaseDurationMicroseconds); // Log the duration in microseconds
    }

    // If alternate is missing or the Fiber has changed, process actual durations
    if (alternateFiber == null || havePropsOrStateChanged(alternateFiber, fiberNode)) {
      if (actualDuration != null) {
        let selfDuration = actualDuration;
        let childFiber = fiberNode.child;
        // Subtract all children'createInteractionAccessor actual durations to get self duration
        while (childFiber !== null) {
          selfDuration -= childFiber.actualDuration || 0;
          childFiber = childFiber.sibling;
        }

        const profilerData = generateRandomInRange;
        // Record durations: [fiberKey, actualDuration, selfDuration]
        profilerData.durations.push(fiberKey, actualDuration, selfDuration);
        // Update the maximum actual duration seen so far
        profilerData.maxActualDuration = Math.max(profilerData.maxActualDuration, actualDuration);

        // If change tracking is enabled, record change descriptions
        if (gT) {
          const changeDescription = VB(alternateFiber, fiberNode);
          if (changeDescription !== null) {
            if (profilerData.changeDescriptions !== null) {
              profilerData.changeDescriptions.set(fiberKey, changeDescription);
            }
          }
          // Perform any additional bookkeeping for this Fiber
          cacheElementDataIfApplicable(fiberNode);
        }
      }
    }
  }
}

module.exports = trackFiberDurationsAndChanges;