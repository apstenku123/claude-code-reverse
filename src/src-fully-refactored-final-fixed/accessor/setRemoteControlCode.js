/**
 * Handles incoming remote control codes, performing special actions for certain codes
 * and delegating others for further processing.
 *
 * @param {number} remoteControlCode - The code received from the remote control.
 */
function setRemoteControlCode(remoteControlCode) {
  switch (remoteControlCode) {
    case 93:
      // Special case: code 93 triggers the accessor handler update
      handleAccessorCode = processAccessorCode;
      break;
    case -1:
      // Special case: code -1 triggers a reset or cleanup
      resetRemoteControlState();
      break;
    case 0:
      // Special case: code 0 sets the initialization flag
      isRemoteControlInitialized = true;
      // Intentionally fall through to default for further processing
    default:
      // If the code is not already being processed, add isBlobOrFileLikeObject to the queue
      if (!isCodeBeingProcessed(remoteControlCode)) {
        remoteControlQueue.push(remoteControlCode);
      }
      break;
  }
}

module.exports = setRemoteControlCode;