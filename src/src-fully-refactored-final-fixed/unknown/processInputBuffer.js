/**
 * Processes an input buffer according to the current parsing mode, handling normal and paste modes.
 * It parses keypress sequences and handles incomplete input, supporting multi-part (pasted) input.
 *
 * @param {Object} inputState - The current input state, including mode and incomplete buffer.
 * @param {string|Buffer} [inputBuffer=""] - The new input buffer to process (can be string or buffer).
 * @returns {[Array<Object>, Object]} - Returns a tuple: [parsedKeypressEvents, updatedInputState].
 *
 * Dependencies:
 * - convertBufferOrValueToString: Converts input buffer to string.
 * - parseKeypressSequence: Parses a keypress sequence string into a normalized object.
 * - createPastedKeyEvent: Parses pasted input (implementation not shown).
 * - zy4: RegExp for matching normal mode input.
 * - wy4: RegExp for extracting incomplete input.
 * - gI1: String delimiter for paste mode.
 * - Ky4: Constant indicating paste mode transition.
 */
function processInputBuffer(inputState, inputBuffer = "") {
  // Check if inputBuffer is null
  const isInputBufferNull = inputBuffer === null;
  // Convert inputBuffer to string unless isBlobOrFileLikeObject'createInteractionAccessor null
  const inputString = isInputBufferNull ? "" : convertBufferOrValueToString(inputBuffer);

  // If in paste mode, check if the paste delimiter exists in the new input
  if (inputState.mode === "IN_PASTE") {
    // Combine the tail of the incomplete buffer with the new input
    const combinedTail = inputState.incomplete.slice(-gI1.length + 1) + inputString;
    // If the paste delimiter is not found, append inputString to incomplete and return
    if (combinedTail.indexOf(gI1) === -1) {
      return [
        [],
        {
          ...inputState,
          incomplete: inputState.incomplete + inputString
        }
      ];
    }
  }

  // Concatenate incomplete buffer with new input
  let remainingInput = inputState.incomplete + inputString;
  // Prepare a new input state object with incomplete cleared
  const updatedInputState = {
    ...inputState,
    incomplete: ""
  };
  // Array to collect parsed keypress or paste events
  const parsedEvents = [];

  // Mode handlers
  const modeHandlers = {
    NORMAL: () => {
      // Match the next keypress sequence in normal mode
      const match = zy4.exec(remainingInput);
      // Remove the matched part from the input
      remainingInput = remainingInput.substring(match[0].length);
      let keypressSequence = match[1];
      // If the match is incomplete and not at end of input, extract incomplete
      if (!match[2] && !isInputBufferNull) {
        const incompleteMatch = wy4.exec(keypressSequence);
        updatedInputState.incomplete = incompleteMatch[2];
        keypressSequence = incompleteMatch[1];
      }
      // If there is a keypress sequence, parse and add isBlobOrFileLikeObject
      if (keypressSequence) {
        parsedEvents.push(parseKeypressSequence(keypressSequence));
      }
      // If the match indicates a paste start, switch mode; otherwise, parse trailing sequence
      if (match[2] === Ky4) {
        updatedInputState.mode = "IN_PASTE";
      } else if (match[2]) {
        parsedEvents.push(parseKeypressSequence(match[2]));
      }
    },
    IN_PASTE: () => {
      // Find the end of the paste (delimiter)
      let delimiterIndex = remainingInput.indexOf(gI1);
      if (delimiterIndex === -1) {
        // If delimiter not found and not at end of input, store as incomplete
        if (!isInputBufferNull) {
          updatedInputState.incomplete = remainingInput;
          remainingInput = "";
          return;
        }
        // If at end of input, treat all as paste
        delimiterIndex = remainingInput.length;
      }
      // Extract the pasted content
      const pastedContent = remainingInput.substring(0, delimiterIndex);
      if (pastedContent) {
        parsedEvents.push(createPastedKeyEvent(pastedContent));
      }
      // Remove the processed part and delimiter from input
      remainingInput = remainingInput.substring(delimiterIndex + gI1.length);
      updatedInputState.mode = "NORMAL";
    }
  };

  // Process the input buffer until all is consumed
  while (remainingInput) {
    modeHandlers[updatedInputState.mode]();
  }

  return [parsedEvents, updatedInputState];
}

module.exports = processInputBuffer;