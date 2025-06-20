/**
 * Processes a work unit within the current execution context, updating global state as needed.
 *
 * This function checks if the global processing flag is set. If so, isBlobOrFileLikeObject attempts to process the given work unit
 * in relation to the current unit of work. It ensures that duplicate work is not processed, handles error cases,
 * and updates global flags and references accordingly.
 *
 * @param {Object} workUnit - The work unit object to process. Must have a 'flags' property.
 * @returns {void}
 */
function processWorkUnit(workUnit) {
  // Check if processing is currently enabled
  if (isProcessingEnabled) {
    const currentUnitOfWork = currentWorkUnit;
    if (currentUnitOfWork) {
      const previousUnitOfWork = currentUnitOfWork;
      // If the work unit is not the same as the current unit of work
      if (!isSameWorkUnit(workUnit, currentUnitOfWork)) {
        // If the work unit is in a special state, throw an error
        if (isWorkUnitInErrorState(workUnit)) {
          throw Error(getErrorMessage(418));
        }
        // Attempt to get the alternate of the previous unit of work
        let alternateUnitOfWork = getAlternateUnitOfWork(previousUnitOfWork);
        const previousWorkQueue = workQueue;
        // If an alternate exists and matches the work unit, perform a global update
        if (alternateUnitOfWork && isSameWorkUnit(workUnit, alternateUnitOfWork)) {
          updateGlobalWorkQueue(previousWorkQueue, previousUnitOfWork);
        } else {
          // Otherwise, update the flags and global state
          workUnit.flags = (workUnit.flags & -4097) | 2;
          isProcessingEnabled = false;
          workQueue = workUnit;
        }
      }
    } else {
      // If there is no current unit of work
      if (isWorkUnitInErrorState(workUnit)) {
        throw Error(getErrorMessage(418));
      }
      workUnit.flags = (workUnit.flags & -4097) | 2;
      isProcessingEnabled = false;
      workQueue = workUnit;
    }
  }
}

module.exports = processWorkUnit;