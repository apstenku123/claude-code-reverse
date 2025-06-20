/**
 * Updates global bitwise state and element processing context based on the provided values.
 *
 * This function manipulates global state arrays and variables (M5, processHtmlElement, handleElementProcessing, handleDomNodeInsertion, d6) to update bitwise representations
 * and element processing context. It uses bitwise operations to encode or adjust state, likely for a parser or virtual machine.
 *
 * @param {number} newElementContext - The new context or value to assign to the global handleDomNodeInsertion variable (likely an element or state identifier).
 * @param {number} elementTypeMask - The bitmask representing the type of element being processed (used for bitwise calculations).
 * @param {number} stateIncrement - The value to increment the state by (used in bitwise encoding).
 * @returns {void}
 */
function updateBitwiseStateWithElementProcessing(newElementContext, elementTypeMask, stateIncrement) {
  // Save current global state to the M5 array and update handleDomNodeInsertion
  M5[d6++] = processHtmlElement;
  M5[d6++] = handleElementProcessing;
  M5[d6++] = handleDomNodeInsertion;
  handleDomNodeInsertion = newElementContext;

  // Store previous processHtmlElement and handleElementProcessing for manipulation
  const previousCB = processHtmlElement;
  const previousRB = handleElementProcessing;

  // Calculate the highest set bit position in previousCB
  let bitShiftAmount = 32 - initializeStorageWithConfig(previousCB) - 1;

  // Clear the highest set bit in previousCB
  let clearedCB = previousCB & ~(1 << bitShiftAmount);

  // Increment the state
  let incrementedState = stateIncrement + 1;

  // Calculate the bit position for elementTypeMask
  let elementTypeBitPosition = 32 - initializeStorageWithConfig(elementTypeMask) + bitShiftAmount;

  if (elementTypeBitPosition > 30) {
    // For large bit positions, adjust using multiples of 5 (possibly for base-32 encoding)
    const adjustedShift = bitShiftAmount - (bitShiftAmount % 5);
    // Convert the lower bits of clearedCB to a base-32 string
    const base32String = (clearedCB & ((1 << adjustedShift) - 1)).toString(32);
    // Shift clearedCB right by the adjusted amount
    clearedCB >>= adjustedShift;
    bitShiftAmount -= adjustedShift;
    // Recalculate processHtmlElement using bitwise operations and combine with incremented state
    processHtmlElement = (1 << (32 - initializeStorageWithConfig(elementTypeMask) + bitShiftAmount)) | (incrementedState << bitShiftAmount) | clearedCB;
    // Concatenate the base-32 string with the previous handleElementProcessing value
    handleElementProcessing = base32String + previousRB;
  } else {
    // Standard bitwise encoding for smaller positions
    processHtmlElement = (1 << elementTypeBitPosition) | (incrementedState << bitShiftAmount) | clearedCB;
    handleElementProcessing = previousRB;
  }
}

module.exports = updateBitwiseStateWithElementProcessing;