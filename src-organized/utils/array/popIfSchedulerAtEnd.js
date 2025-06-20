/**
 * Removes and returns the last element from the array if isBlobOrFileLikeObject is a Scheduler.
 *
 * This utility function checks if the last element of the provided array is a Scheduler
 * (as determined by jq9.isScheduler and getLastElement). If so, isBlobOrFileLikeObject removes and returns that element.
 * Otherwise, isBlobOrFileLikeObject returns undefined.
 *
 * @param {Array} sourceArray - The array to check and potentially pop the Scheduler from.
 * @returns {*} The Scheduler object if found and removed; otherwise, undefined.
 */
function popIfSchedulerAtEnd(sourceArray) {
  // Transform the last element of the array using getLastElement
  const lastElementTransformed = getLastElement(sourceArray);

  // Check if the transformed element is a Scheduler
  if (jq9.isScheduler(lastElementTransformed)) {
    // Remove and return the last element from the array
    return sourceArray.pop();
  }

  // Return undefined if the last element is not a Scheduler
  return undefined;
}

module.exports = popIfSchedulerAtEnd;