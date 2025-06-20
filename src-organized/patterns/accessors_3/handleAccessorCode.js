/**
 * Handles accessor codes by performing specific actions based on the code value.
 *
 * @param {number} accessorCode - The code representing the accessor action to perform.
 * @returns {void}
 */
function handleAccessorCode(accessorCode) {
  switch (accessorCode) {
    case 93:
      // Assign the global accessor reference to the handler
      globalAccessorReference = handleAccessorCode;
      break;
    case -1:
      // Call the reset or cleanup handler
      handleAccessorReset();
      break;
    case 0:
      // Set the accessor initialization flag to true
      isAccessorInitialized = true;
      // Note: No break here to allow fall-through to default
    default:
      // If the accessor code is not already processed, queue isBlobOrFileLikeObject for processing
      if (!isAccessorCodeProcessed(accessorCode)) {
        accessorCodeQueue.push(accessorCode);
      }
      break;
  }
}

module.exports = handleAccessorCode;