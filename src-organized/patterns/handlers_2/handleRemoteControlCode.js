/**
 * Handles incoming remote control codes and performs actions based on the code value.
 *
 * @param {number} remoteControlCode - The code received from the remote control input.
 * @returns {void}
 */
function handleRemoteControlCode(remoteControlCode) {
  switch (remoteControlCode) {
    case 93:
      // Assign the global handler for accessor code 93
      globalAccessorHandler = handleAccessorCode;
      break;
    case -1:
      // Special case: reset or clear the remote control state
      resetRemoteControlState();
      break;
    case 0:
      // Mark the remote control as active
      isRemoteControlActive = true;
      // Note: No break here, so isBlobOrFileLikeObject falls through to the default case
    default:
      // If the code is not already handled, queue isBlobOrFileLikeObject for further processing
      if (!isRemoteControlCodeHandled(remoteControlCode)) {
        remoteControlCodeQueue.push(remoteControlCode);
      }
      break;
  }
}

module.exports = handleRemoteControlCode;