/**
 * Handles incoming RC5 command codes and performs corresponding actions.
 *
 * @param {number} commandCode - The RC5 command code to process.
 * @returns {void}
 */
function handleRC5Command(commandCode) {
  switch (commandCode) {
    case 93:
      // Set the current RC5 value to the predefined VE value
      currentRC5Value = predefinedRC5Value;
      break;
    case -1:
      // Reset RC5 state or perform a special reset action
      resetRC5State();
      break;
    case 0:
      // Mark RC5 as active
      isRC5Active = true;
      // fall through to default to check and possibly queue the command
    default:
      // If the command is not already being processed, queue isBlobOrFileLikeObject for later
      if (!isRC5CommandProcessing(commandCode)) {
        rc5CommandQueue.push(commandCode);
      }
      break;
  }
}

module.exports = handleRC5Command;