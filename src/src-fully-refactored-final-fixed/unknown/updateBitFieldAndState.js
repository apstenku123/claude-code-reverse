/**
 * Updates global bit field and state variables based on input values.
 *
 * This function manipulates a global bit field (processHtmlElement), a state string (handleElementProcessing),
 * and a numeric state (handleDomNodeInsertion) based on the provided input value, mask, and increment.
 * It also stores the current state in a global array (M5) and updates a global index (d6).
 * The logic involves bitwise operations to adjust the bit field and state string
 * depending on the computed shift amount.
 *
 * @param {number} inputValue - The new value to set for the numeric state (handleDomNodeInsertion).
 * @param {number} maskValue - The mask used to compute bit positions and field width.
 * @param {number} incrementValue - The value to increment and encode into the bit field.
 * @returns {void}
 */
function updateBitFieldAndState(inputValue, maskValue, incrementValue) {
  // Save current global state to M5 array and update global index
  M5[d6++] = processHtmlElement;
  M5[d6++] = handleElementProcessing;
  M5[d6++] = handleDomNodeInsertion;

  // Update global numeric state
  handleDomNodeInsertion = inputValue;

  // Store previous bit field and state string
  const previousBitField = processHtmlElement;
  const previousStateString = handleElementProcessing;

  // Calculate the bit position to clear in the bit field
  let bitPosition = 32 - initializeStorageWithConfig(previousBitField) - 1;
  // Clear the bit at bitPosition
  let updatedBitField = previousBitField & ~(1 << bitPosition);

  // Increment the value to encode
  let incrementedValue = incrementValue + 1;

  // Calculate the shift amount for the new bit field
  let shiftAmount = 32 - initializeStorageWithConfig(maskValue) + bitPosition;

  if (shiftAmount > 30) {
    // If shiftAmount is large, split the bit field and encode part as a string
    const roundedBitPosition = bitPosition - (bitPosition % 5);
    // Convert lower bits to base-32 string
    const lowerBitsString = (updatedBitField & ((1 << roundedBitPosition) - 1)).toString(32);
    // Shift out the lower bits
    updatedBitField >>= roundedBitPosition;
    bitPosition -= roundedBitPosition;
    // Compose the new bit field
    processHtmlElement = (1 << (32 - initializeStorageWithConfig(maskValue) + bitPosition)) | (incrementedValue << bitPosition) | updatedBitField;
    // Concatenate the lower bits string with the previous state string
    handleElementProcessing = lowerBitsString + previousStateString;
  } else {
    // Standard case: encode everything in the bit field
    processHtmlElement = (1 << shiftAmount) | (incrementedValue << bitPosition) | updatedBitField;
    handleElementProcessing = previousStateString;
  }
}

module.exports = updateBitFieldAndState;