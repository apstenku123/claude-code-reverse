/**
 * Parses a comma-separated string of WebSocket subprotocols, validates each subprotocol name,
 * ensures no duplicates, and returns a Set of unique subprotocol names.
 *
 * @param {string} subprotocolsString - The comma-separated string of subprotocols to parse and validate.
 * @returns {Set<string>} Set of unique, validated subprotocol names.
 * @throws {SyntaxError} If the input contains invalid characters, duplicate subprotocols, or is malformed.
 */
function parseSubprotocolList(subprotocolsString) {
  /**
   * Vk4 is assumed to be an external lookup table (array or object) where
   * Vk4[charCode] === 1 means the character is a valid start character for a subprotocol.
   * This should be defined elsewhere in your codebase.
   */
  
  const uniqueSubprotocols = new Set();
  let startIdx = -1; // Start index of the current subprotocol
  let endIdx = -1;   // End index (exclusive) of the current subprotocol
  let currentIdx = 0;

  while (currentIdx < subprotocolsString.length) {
    const charCode = subprotocolsString.charCodeAt(currentIdx);

    // If not currently parsing a subprotocol and found a valid start character
    if (endIdx === -1 && Vk4[charCode] === 1) {
      if (startIdx === -1) {
        startIdx = currentIdx;
      }
    }
    // If whitespace (space or tab) after a subprotocol name
    else if (
      currentIdx !== 0 && (charCode === 32 /* space */ || charCode === 9 /* tab */)
    ) {
      if (endIdx === -1 && startIdx !== -1) {
        endIdx = currentIdx;
      }
    }
    // If comma, end of current subprotocol
    else if (charCode === 44 /* comma */) {
      if (startIdx === -1) {
        throw new SyntaxError(`Unexpected character at index ${currentIdx}`);
      }
      if (endIdx === -1) {
        endIdx = currentIdx;
      }
      const subprotocol = subprotocolsString.slice(startIdx, endIdx);
      if (uniqueSubprotocols.has(subprotocol)) {
        throw new SyntaxError(`The "${subprotocol}" subprotocol is duplicated`);
      }
      uniqueSubprotocols.add(subprotocol);
      // Reset indices for next subprotocol
      startIdx = -1;
      endIdx = -1;
    }
    // Any other character is invalid
    else {
      throw new SyntaxError(`Unexpected character at index ${currentIdx}`);
    }
    currentIdx++;
  }

  // After the loop, ensure there is a trailing subprotocol to add
  if (startIdx === -1 || endIdx !== -1) {
    throw new SyntaxError("Unexpected end of input");
  }
  const lastSubprotocol = subprotocolsString.slice(startIdx, currentIdx);
  if (uniqueSubprotocols.has(lastSubprotocol)) {
    throw new SyntaxError(`The "${lastSubprotocol}" subprotocol is duplicated`);
  }
  uniqueSubprotocols.add(lastSubprotocol);
  return uniqueSubprotocols;
}

module.exports = parseSubprotocolList;
