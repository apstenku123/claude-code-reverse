/**
 * Parses a comma-separated string of WebSocket subprotocols, validates each subprotocol name,
 * ensures no duplicates, and returns a Set of unique subprotocols.
 *
 * @param {string} subprotocolsString - The comma-separated string of subprotocol names to parse and validate.
 * @returns {Set<string>} Set of unique, validated subprotocol names.
 * @throws {SyntaxError} If the input contains unexpected characters, duplicate subprotocols, or is malformed.
 */
function parseAndValidateSubprotocols(subprotocolsString) {
  /**
   * Vk4 is assumed to be an external lookup table (array or object) where
   * Vk4[charCode] === 1 indicates a valid starting character for a subprotocol name.
   * This must be defined in the outer scope.
   */

  const uniqueSubprotocols = new Set(); // Stores unique subprotocol names
  let subprotocolStartIndex = -1;       // Start index of the current subprotocol name
  let subprotocolEndIndex = -1;         // End index (exclusive) of the current subprotocol name

  // Iterate over each character in the input string
  for (let currentIndex = 0; currentIndex < subprotocolsString.length; currentIndex++) {
    const charCode = subprotocolsString.charCodeAt(currentIndex);

    // If handleMissingDoctypeError haven'processRuleBeginHandlers started a subprotocol and this is a valid starting character
    if (subprotocolEndIndex === -1 && Vk4[charCode] === 1) {
      if (subprotocolStartIndex === -1) {
        subprotocolStartIndex = currentIndex;
      }
    }
    // If not at the first character, and this is a space or tab (ASCII 32 or 9)
    else if (currentIndex !== 0 && (charCode === 32 || charCode === 9)) {
      // Mark the end of the current subprotocol name if not already marked
      if (subprotocolEndIndex === -1 && subprotocolStartIndex !== -1) {
        subprotocolEndIndex = currentIndex;
      }
    }
    // If this is a comma, indicating the end of a subprotocol name
    else if (charCode === 44) { // 44 is ','
      if (subprotocolStartIndex === -1) {
        throw new SyntaxError(`Unexpected character at index ${currentIndex}`);
      }
      if (subprotocolEndIndex === -1) {
        subprotocolEndIndex = currentIndex;
      }
      const subprotocol = subprotocolsString.slice(subprotocolStartIndex, subprotocolEndIndex);
      if (uniqueSubprotocols.has(subprotocol)) {
        throw new SyntaxError(`The "${subprotocol}" subprotocol is duplicated`);
      }
      uniqueSubprotocols.add(subprotocol);
      // Reset indices for the next subprotocol
      subprotocolStartIndex = -1;
      subprotocolEndIndex = -1;
    }
    // Any other character is unexpected
    else {
      throw new SyntaxError(`Unexpected character at index ${currentIndex}`);
    }
  }

  // After the loop, ensure there is a final subprotocol to add
  if (subprotocolStartIndex === -1 || subprotocolEndIndex !== -1) {
    throw new SyntaxError("Unexpected end of input");
  }
  const lastSubprotocol = subprotocolsString.slice(subprotocolStartIndex, subprotocolsString.length);
  if (uniqueSubprotocols.has(lastSubprotocol)) {
    throw new SyntaxError(`The "${lastSubprotocol}" subprotocol is duplicated`);
  }
  uniqueSubprotocols.add(lastSubprotocol);

  return uniqueSubprotocols;
}

module.exports = parseAndValidateSubprotocols;
