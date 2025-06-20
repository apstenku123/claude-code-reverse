/**
 * Parses a comma-separated string of WebSocket subprotocols, validates each for allowed characters,
 * ensures no duplicates, and returns a Set of unique subprotocols.
 *
 * @param {string} subprotocolsString - The comma-separated string of subprotocol names to parse and validate.
 * @returns {Set<string>} a Set containing unique, validated subprotocol names.
 * @throws {SyntaxError} If the input contains invalid characters, duplicate subprotocols, or has malformed syntax.
 */
function parseAndValidateSubprotocolList(subprotocolsString) {
  /**
   * Vk4 is assumed to be a lookup table (array or object) where Vk4[charCode] === 1
   * means the character is allowed in a subprotocol name. This must be defined in the module scope.
   */
  const uniqueSubprotocols = new Set();
  let subprotocolStartIndex = -1; // Start index of the current subprotocol
  let subprotocolEndIndex = -1;   // End index (exclusive) of the current subprotocol
  let currentIndex = 0;

  for (; currentIndex < subprotocolsString.length; currentIndex++) {
    const charCode = subprotocolsString.charCodeAt(currentIndex);

    // If not currently parsing a subprotocol and this character is allowed, mark the start
    if (subprotocolEndIndex === -1 && Vk4[charCode] === 1) {
      if (subprotocolStartIndex === -1) {
        subprotocolStartIndex = currentIndex;
      }
    }
    // If whitespace (space or tab) after a subprotocol name, mark the end
    else if (
      currentIndex !== 0 &&
      (charCode === 32 /* space */ || charCode === 9 /* tab */)
    ) {
      if (subprotocolEndIndex === -1 && subprotocolStartIndex !== -1) {
        subprotocolEndIndex = currentIndex;
      }
    }
    // If comma, extract and validate the subprotocol name
    else if (charCode === 44 /* comma */) {
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
      // Reset for the next subprotocol
      subprotocolStartIndex = -1;
      subprotocolEndIndex = -1;
    }
    // Any other character is invalid
    else {
      throw new SyntaxError(`Unexpected character at index ${currentIndex}`);
    }
  }

  // After the loop, ensure the last subprotocol is valid and not duplicated
  if (subprotocolStartIndex === -1 || subprotocolEndIndex !== -1) {
    throw new SyntaxError("Unexpected end of input");
  }
  const lastSubprotocol = subprotocolsString.slice(subprotocolStartIndex, currentIndex);
  if (uniqueSubprotocols.has(lastSubprotocol)) {
    throw new SyntaxError(`The "${lastSubprotocol}" subprotocol is duplicated`);
  }
  uniqueSubprotocols.add(lastSubprotocol);
  return uniqueSubprotocols;
}

module.exports = parseAndValidateSubprotocolList;