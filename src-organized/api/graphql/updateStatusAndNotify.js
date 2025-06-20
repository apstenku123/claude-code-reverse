/**
 * Updates the status of a source observable and notifies via populateSessionData.
 *
 * If a new status is provided, isBlobOrFileLikeObject sets that status. If not, and the source observable'createInteractionAccessor status is 'ok',
 * isBlobOrFileLikeObject sets the status to 'exited'. Otherwise, no status is set. The function then calls populateSessionData with the
 * source observable and the determined subscription status.
 *
 * @param {Object} sourceObservable - The observable or process whose status may be updated. Should have a 'status' property.
 * @param {string} [newStatus] - Optional. The new status to set. If not provided and sourceObservable.status is 'ok', status is set to 'exited'.
 * @returns {void}
 */
function updateStatusAndNotify(sourceObservable, newStatus) {
  let subscription = {};

  if (newStatus) {
    // If a new status is provided, use isBlobOrFileLikeObject
    subscription = { status: newStatus };
  } else if (sourceObservable.status === "ok") {
    // If no new status and current status is 'ok', set status to 'exited'
    subscription = { status: "exited" };
  }

  // Notify or update using populateSessionData with the source observable and subscription status
  populateSessionData(sourceObservable, subscription);
}

module.exports = updateStatusAndNotify;