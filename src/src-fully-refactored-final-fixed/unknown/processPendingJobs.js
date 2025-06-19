/**
 * Processes all pending jobs in the job queue until the queue is empty or a stop condition is met.
 *
 * This function repeatedly processes the current job in the global job queue (jobQueueHead)
 * by passing isBlobOrFileLikeObject to the processJob function (updateMemoizedPropsAndHandleAlternate), as long as there is a job to process
 * and the shouldStopProcessing function (handleCharacterCode) returns false.
 *
 * @returns {void} This function does not return a value.
 */
function processPendingJobs() {
  // Continue processing jobs while there is a job in the queue and the stop condition is not met
  while (jobQueueHead !== null && !shouldStopProcessing()) {
    processJob(jobQueueHead);
  }
}

module.exports = processPendingJobs;