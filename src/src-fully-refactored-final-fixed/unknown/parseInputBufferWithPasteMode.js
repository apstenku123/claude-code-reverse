/**
 * Parses an input buffer, handling normal and paste modes, and returns parsed key events and updated state.
 *
 * @param {Object} inputState - The current input state, including mode and incomplete buffer.
 * @param {string|Buffer} [inputBuffer=""] - The new input buffer to process (may be string or Buffer).
 * @returns {[Array<Object>, Object]} An array of parsed key events and the updated input state.
 *
 * The function supports two modes:
 *   - NORMAL: parses keypresses and switches to IN_PASTE mode if a paste sequence is detected
 *   - IN_PASTE: collects pasted content until the paste end sequence is found
 *
 * Dependencies (must be in scope):
 *   - convertBufferOrValueToString (convertBufferOrValueToString)
 *   - parseKeypressSequence (parseKeypressSequence)
 *   - createPastedKeyEvent(parses pasted content)
 *   - zy4 (regex for keypress parsing)
 *   - wy4 (regex for incomplete keypress parsing)
 *   - Ky4 (paste mode identifier)
 *   - gI1 (paste end sequence)
 */
function parseInputBufferWithPasteMode(inputState, inputBuffer = "") {
  // Determine if the input buffer is null
  const isNullBuffer = inputBuffer === null;
  // Convert buffer to string unless null
  const bufferString = isNullBuffer ? "" : convertBufferOrValueToString(inputBuffer);

  // If currently in paste mode, check if paste end sequence is present
  if (inputState.mode === "IN_PASTE") {
    // Check if the paste end sequence is present in the concatenated buffer
    const pasteEndCandidate = inputState.incomplete.slice(-gI1.length + 1) + bufferString;
    if (pasteEndCandidate.indexOf(gI1) === -1) {
      // Paste end not found, accumulate buffer and return
      return [[], {
        ...inputState,
        incomplete: inputState.incomplete + bufferString
      }];
    }
  }

  // Concatenate incomplete buffer with new input
  let workingBuffer = inputState.incomplete + bufferString;
  // Prepare updated state with empty incomplete buffer
  const updatedState = {
    ...inputState,
    incomplete: ""
  };
  // Array to collect parsed key events
  const parsedEvents = [];

  // Mode handlers
  const modeHandlers = {
    NORMAL: () => {
      // Try to match a keypress sequence
      const match = zy4.exec(workingBuffer);
      // Remove matched sequence from buffer
      workingBuffer = workingBuffer.substring(match[0].length);
      let keySequence = match[1];
      // If the match is incomplete and buffer is not null, handle incomplete sequence
      if (!match[2] && !isNullBuffer) {
        const incompleteMatch = wy4.exec(keySequence);
        updatedState.incomplete = incompleteMatch[2];
        keySequence = incompleteMatch[1];
      }
      // If handleMissingDoctypeError have a complete key sequence, parse and add to results
      if (keySequence) {
        parsedEvents.push(parseKeypressSequence(keySequence));
      }
      // If the match indicates paste mode, switch mode
      if (match[2] === Ky4) {
        updatedState.mode = "IN_PASTE";
      } else if (match[2]) {
        // Otherwise, parse any trailing sequence
        parsedEvents.push(parseKeypressSequence(match[2]));
      }
    },
    IN_PASTE: () => {
      // Look for the paste end sequence
      let pasteEndIndex = workingBuffer.indexOf(gI1);
      if (pasteEndIndex === -1) {
        // Paste end not found
        if (!isNullBuffer) {
          // Buffer is not null, accumulate as incomplete
          updatedState.incomplete = workingBuffer;
          workingBuffer = "";
          return;
        }
        // If buffer is null, treat all as pasted content
        pasteEndIndex = workingBuffer.length;
      }
      // Extract pasted content
      const pastedContent = workingBuffer.substring(0, pasteEndIndex);
      if (pastedContent) {
        parsedEvents.push(createPastedKeyEvent(pastedContent));
      }
      // Remove pasted content and paste end sequence from buffer
      workingBuffer = workingBuffer.substring(pasteEndIndex + gI1.length);
      // Switch back to normal mode
      updatedState.mode = "NORMAL";
    }
  };

  // Process the buffer until empty
  while (workingBuffer) {
    modeHandlers[updatedState.mode]();
  }

  return [parsedEvents, updatedState];
}

module.exports = parseInputBufferWithPasteMode;
