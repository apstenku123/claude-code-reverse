/**
 * Updates global bitwise state variables based on provided values and performs bitwise manipulations.
 *
 * This function updates the global state arrays and variables (M5, processHtmlElement, handleElementProcessing, handleDomNodeInsertion, d6) by performing a series of bitwise operations
 * on the provided parameters. It is likely used for encoding or manipulating bitfields in a custom data structure or protocol.
 *
 * @param {number} newBitValue - The new bit value to be set as the current bit state (previously 'processWithTransformedObservable').
 * @param {number} maskValue - The mask value used for bitwise calculations (previously 'UL').
 * @param {number} incrementValue - The value to increment and use in bitwise operations (previously 's').
 * @returns {void}
 */
function updateBitwiseState(newBitValue, maskValue, incrementValue) {
  // Save current global state to the M5 array and update handleDomNodeInsertion
  M5[d6++] = processHtmlElement;
  M5[d6++] = handleElementProcessing;
  M5[d6++] = handleDomNodeInsertion;
  handleDomNodeInsertion = newBitValue;

  // Store previous processHtmlElement and handleElementProcessing for manipulation
  const previousCB = processHtmlElement;
  const previousRB = handleElementProcessing;

  // Calculate the bit position to clear in previousCB
  let bitPosition = 32 - initializeStorageWithConfig(previousCB) - 1;
  let clearedCB = previousCB & ~(1 << bitPosition);
  let incrementedValue = incrementValue + 1;

  // Calculate the shift amount for the mask
  let shiftAmount = 32 - initializeStorageWithConfig(maskValue) + bitPosition;

  if (shiftAmount > 30) {
    // If shiftAmount is large, perform special encoding
    const nearestMultipleOfFive = bitPosition - (bitPosition % 5);
    // Extract lower bits and convert to base-32 string
    const lowerBitsString = (clearedCB & ((1 << nearestMultipleOfFive) - 1)).toString(32);
    // Shift clearedCB right by nearestMultipleOfFive
    clearedCB >>= nearestMultipleOfFive;
    bitPosition -= nearestMultipleOfFive;
    // Reconstruct processHtmlElement with new bitwise composition
    processHtmlElement = (1 << (32 - initializeStorageWithConfig(maskValue) + bitPosition)) | (incrementedValue << bitPosition) | clearedCB;
    // Concatenate lowerBitsString with previousRB for handleElementProcessing
    handleElementProcessing = lowerBitsString + previousRB;
  } else {
    // Standard bitwise composition
    processHtmlElement = (1 << shiftAmount) | (incrementedValue << bitPosition) | clearedCB;
    handleElementProcessing = previousRB;
  }
}

module.exports = updateBitwiseState;