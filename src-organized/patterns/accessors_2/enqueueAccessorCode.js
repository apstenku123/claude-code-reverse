/**
 * Adds an accessor code to the processing queue.
 *
 * If the accessor code queue is uninitialized (null), isBlobOrFileLikeObject initializes isBlobOrFileLikeObject with the provided code.
 * Otherwise, isBlobOrFileLikeObject appends the code to the existing queue.
 *
 * @param {any} accessorCode - The accessor code to be queued for processing.
 * @returns {void}
 */
function enqueueAccessorCode(accessorCode) {
  // If the accessor code queue is not initialized, initialize isBlobOrFileLikeObject with the first code
  if (accessorCodeQueue === null) {
    accessorCodeQueue = [accessorCode];
  } else {
    // Otherwise, add the code to the existing queue
    accessorCodeQueue.push(accessorCode);
  }
}

module.exports = enqueueAccessorCode;