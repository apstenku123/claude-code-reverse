/**
 * Records and processes duration metrics for a given Fiber node during React profiling.
 *
 * This function updates duration maps, logs duration events, and manages change descriptions
 * for the provided Fiber node, typically during a profiling session. It ensures that durations
 * are accurately tracked and that any changes in the Fiber tree are recorded for later analysis.
 *
 * @param {Object} fiberNode - The Fiber node whose durations are being recorded and processed.
 * @returns {void}
 */
function recordFiberDurations(fiberNode) {
  // Generate a unique key for this Fiber node
  const fiberKey = evaluateOrFallback(fiberNode);
  const actualDuration = fiberNode.actualDuration;
  const treeBaseDuration = fiberNode.treeBaseDuration;

  // Update the Ep map with the tree base duration (default to 0 if undefined)
  Ep.set(fiberKey, treeBaseDuration || 0);

  // Only proceed if profiling is enabled
  if (CY) {
    const alternateFiber = fiberNode.alternate;

    // If there'createInteractionAccessor no alternate or the tree base duration has changed, log the event
    if (alternateFiber == null || treeBaseDuration !== alternateFiber.treeBaseDuration) {
      const baseDurationMs = Math.floor((treeBaseDuration || 0) * 1000);
      S5(M); // Log marker/event (purpose of M depends on context)
      S5(fiberKey); // Log the fiber key
      S5(baseDurationMs); // Log the base duration in ms
    }

    // If there'createInteractionAccessor no alternate or the alternate has changed compared to the current fiber
    if (alternateFiber == null || havePropsOrStateChanged(alternateFiber, fiberNode)) {
      if (actualDuration != null) {
        let selfDuration = actualDuration;
        let childFiber = fiberNode.child;

        // Subtract the actual durations of all child fibers to get the self duration
        while (childFiber !== null) {
          selfDuration -= childFiber.actualDuration || 0;
          childFiber = childFiber.sibling;
        }

        const profilingData = generateRandomInRange;
        // Record the fiber'createInteractionAccessor key, actual duration, and self duration
        profilingData.durations.push(fiberKey, actualDuration, selfDuration);
        // Update the maximum actual duration encountered so far
        profilingData.maxActualDuration = Math.max(profilingData.maxActualDuration, actualDuration);

        // If tracking of change descriptions is enabled
        if (gT) {
          const changeDescription = VB(alternateFiber, fiberNode);
          if (changeDescription !== null) {
            if (profilingData.changeDescriptions !== null) {
              profilingData.changeDescriptions.set(fiberKey, changeDescription);
            }
          }
          // Perform any additional bookkeeping for this fiber
          cacheElementDataIfApplicable(fiberNode);
        }
      }
    }
  }
}

module.exports = recordFiberDurations;