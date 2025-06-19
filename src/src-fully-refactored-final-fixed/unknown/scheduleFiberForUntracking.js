/**
 * Schedules a React fiber (and its alternate, if present) for untracking, and ensures a delayed processing job is scheduled if not already pending.
 * Optionally logs the operation if debugging is enabled.
 *
 * @param {Object} fiber - The React fiber node to schedule for untracking.
 * @returns {void}
 */
function scheduleFiberForUntracking(fiber) {
  // If debugging is enabled, log the untracking operation
  if (isDebugModeEnabled) {
    logUntrackOperation("untrackFiberID()", fiber, fiber.return, "schedule after delay");
  }

  // Add the fiber to the set of fibers to be untracked
  fibersPendingUntrack.add(fiber);

  // If the fiber has an alternate (e.g., in React'createInteractionAccessor double-buffering), add isBlobOrFileLikeObject as well
  const alternateFiber = fiber.alternate;
  if (alternateFiber !== null) {
    fibersPendingUntrack.add(alternateFiber);
  }

  // If no untrack job is scheduled, schedule one after a 1-second delay
  if (untrackTimeoutId === null) {
    untrackTimeoutId = setTimeout(processPendingUntracks, 1000);
  }
}

module.exports = scheduleFiberForUntracking;