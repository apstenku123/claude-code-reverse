/**
 * Updates profiling durations and related metadata for a given fiber node.
 *
 * This function records the base and actual durations of a fiber node (typically used in React Profiler)
 * and updates relevant tracking structures. It also handles change descriptions and invokes hooks
 * for further processing if profiling is enabled.
 *
 * @param {Object} fiberNode - The fiber node whose durations are being updated.
 * @returns {void}
 */
function updateProfilerDurations(fiberNode) {
  // Get a unique key for this fiber node
  const fiberKey = evaluateOrFallback(fiberNode);
  const actualDuration = fiberNode.actualDuration;
  const treeBaseDuration = fiberNode.treeBaseDuration;

  // Record the base duration for this fiber node
  Ep.set(fiberKey, treeBaseDuration || 0);

  // Only proceed if profiling is enabled
  if (CY) {
    const alternateFiber = fiberNode.alternate;

    // If this is a new fiber or the base duration has changed, log the update
    if (alternateFiber == null || treeBaseDuration !== alternateFiber.treeBaseDuration) {
      const baseDurationMs = Math.floor((treeBaseDuration || 0) * 1000);
      S5(M); // Log marker (purpose of M is external)
      S5(fiberKey); // Log the fiber key
      S5(baseDurationMs); // Log the base duration in ms
    }

    // If this is a new fiber or the fiber has changed, process actual durations
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
        // Track durations: [fiberKey, actualDuration, selfDuration]
        profilerData.durations.push(fiberKey, actualDuration, selfDuration);
        // Update the maximum actual duration seen so far
        profilerData.maxActualDuration = Math.max(profilerData.maxActualDuration, actualDuration);

        // If tracking change descriptions is enabled
        if (gT) {
          const changeDescription = VB(alternateFiber, fiberNode);
          if (changeDescription !== null) {
            if (profilerData.changeDescriptions !== null) {
              profilerData.changeDescriptions.set(fiberKey, changeDescription);
            }
          }
          // Perform additional bookkeeping for this fiber
          cacheElementDataIfApplicable(fiberNode);
        }
      }
    }
  }
}

module.exports = updateProfilerDurations;