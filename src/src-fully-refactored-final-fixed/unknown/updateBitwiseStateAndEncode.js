/**
 * Updates global bitwise state and encodes a value based on bit manipulation logic.
 *
 * This function manipulates global state arrays and variables to encode a value using bitwise operations.
 * It appears to be part of a serialization or encoding process, possibly for compact data representation.
 *
 * @param {number} newBitwiseValue - The new value to set for the global bitwise state (was 'processWithTransformedObservable').
 * @param {number} elementType - The element type or bitmask to use in encoding (was 'UL').
 * @param {number} incrementValue - The value to increment and encode (was 's').
 * @returns {void}
 */
function updateBitwiseStateAndEncode(newBitwiseValue, elementType, incrementValue) {
  // Save current global state to the M5 array and update handleDomNodeInsertion
  M5[d6++] = processHtmlElement; // Save current processHtmlElement
  M5[d6++] = handleElementProcessing; // Save current handleElementProcessing
  M5[d6++] = handleDomNodeInsertion; // Save current handleDomNodeInsertion
  handleDomNodeInsertion = newBitwiseValue; // Update handleDomNodeInsertion to the new value

  // Store previous processHtmlElement and handleElementProcessing for manipulation
  const previousCB = processHtmlElement;
  const previousRB = handleElementProcessing;

  // Calculate the bit position to manipulate
  let bitPosition = 32 - initializeStorageWithConfig(previousCB) - 1;

  // Clear the bit at bitPosition in previousCB
  let maskedCB = previousCB & ~(1 << bitPosition);

  // Increment the value to encode
  let incrementedValue = incrementValue + 1;

  // Calculate the shift amount for encoding
  let shiftAmount = 32 - initializeStorageWithConfig(elementType) + bitPosition;

  if (shiftAmount > 30) {
    // For large shift amounts, encode part of the value as a base-32 string
    const nearestMultipleOfFive = bitPosition - (bitPosition % 5);
    // Mask to extract the lower bits for string encoding
    const lowerBitsMask = (1 << nearestMultipleOfFive) - 1;
    const encodedString = (maskedCB & lowerBitsMask).toString(32);
    // Shift out the lower bits
    let shiftedCB = maskedCB >> nearestMultipleOfFive;
    let remainingBits = bitPosition - nearestMultipleOfFive;
    // Reconstruct processHtmlElement with the new encoding
    processHtmlElement = (1 << (32 - initializeStorageWithConfig(elementType) + remainingBits)) | (incrementedValue << remainingBits) | shiftedCB;
    // Concatenate encoded string with previousRB
    handleElementProcessing = encodedString + previousRB;
  } else {
    // For smaller shift amounts, encode directly
    processHtmlElement = (1 << shiftAmount) | (incrementedValue << bitPosition) | maskedCB;
    handleElementProcessing = previousRB;
  }
}

module.exports = updateBitwiseStateAndEncode;