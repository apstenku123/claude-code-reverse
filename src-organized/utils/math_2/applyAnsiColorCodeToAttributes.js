/**
 * Updates the given attributes object based on an ANSI color code sequence.
 *
 * This function interprets ANSI SGR (Select Graphic Rendition) codes from the provided codeSequence array
 * and updates the attributes object accordingly, handling foreground/background color changes and resets.
 *
 * @param {Object} attributes - The object representing current text attributes (e.g., foreground/background colors).
 * @param {Array} codeSequence - An array where:
 *   - codeSequence[0]: The raw ANSI code string (e.g., '31', '41', etc.).
 *   - codeSequence[1]: (Optional) a string containing the numeric code and possibly additional data, separated by ';'.
 *
 * @returns {void}
 */
function applyAnsiColorCodeToAttributes(attributes, codeSequence) {
  // Extract the numeric code from codeSequence[1], if present
  const codeString = codeSequence[1] ? codeSequence[1].split(';')[0] : '0';
  const ansiCode = parseInt(codeString, 10);

  // Handle foreground color codes (30-39 and 90-97)
  if ((ansiCode >= 30 && ansiCode <= 39) || (ansiCode >= 90 && ansiCode <= 97)) {
    attributes.lastForegroundAdded = codeSequence[0];
    return;
  }

  // Handle background color codes (40-49 and 100-107)
  if ((ansiCode >= 40 && ansiCode <= 49) || (ansiCode >= 100 && ansiCode <= 107)) {
    attributes.lastBackgroundAdded = codeSequence[0];
    return;
  }

  // Handle reset code (0)
  if (ansiCode === 0) {
    // Remove all own properties from the attributes object
    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        delete attributes[key];
      }
    }
    return;
  }

  // Handle other codes using the xu mapping
  const ansiMapping = xu[codeSequence[0]];
  if (ansiMapping) {
    attributes[ansiMapping.set] = ansiMapping.to;
  }
}

module.exports = applyAnsiColorCodeToAttributes;
