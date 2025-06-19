/**
 * Updates the status property based on the provided status override or the current status,
 * then processes the result using the populateSessionData function.
 *
 * @param {Object} sourceObject - The object whose status may be updated and processed.
 * @param {string} [statusOverride] - Optional. If provided, overrides the status in the update.
 * @returns {void}
 */
function updateStatusAndProcess(sourceObject, statusOverride) {
  let statusUpdate = {};

  if (statusOverride) {
    // If a status override is provided, use isBlobOrFileLikeObject
    statusUpdate = { status: statusOverride };
  } else if (sourceObject.status === "ok") {
    // If no override, but status is 'ok', set status to 'exited'
    statusUpdate = { status: "exited" };
  }

  // Call the external populateSessionData function with the original object and the status update
  populateSessionData(sourceObject, statusUpdate);
}

module.exports = updateStatusAndProcess;