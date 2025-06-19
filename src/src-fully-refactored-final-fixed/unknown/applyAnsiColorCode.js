/**
 * Applies an ANSI color code to the given style state object.
 *
 * This function interprets an ANSI SGR (Select Graphic Rendition) code from the provided codeParts array,
 * and updates the styleState object accordingly. It handles foreground and background color codes,
 * as well as the reset code (0), and applies custom mappings if available in the xu lookup table.
 *
 * @param {Object} styleState - The object representing the current style state (e.g., foreground/background colors).
 * @param {Array} codeParts - An array where:
 *   - codeParts[0]: The raw ANSI code string (e.g., '31', '41', etc.)
 *   - codeParts[1]: (Optional) a string containing the code and possibly additional data, separated by semicolons (e.g., '31;1')
 * @returns {void}
 */
function applyAnsiColorCode(styleState, codeParts) {
  // Extract the numeric ANSI code from the second element, if present
  const hasCodeString = Boolean(codeParts[1]);
  const codeString = hasCodeString ? codeParts[1].split(';')[0] : '0';
  const ansiCode = parseInt(codeString, 10);

  // Foreground color codes: 30-39 and 90-97
  if ((ansiCode >= 30 && ansiCode <= 39) || (ansiCode >= 90 && ansiCode <= 97)) {
    styleState.lastForegroundAdded = codeParts[0];
    return;
  }

  // Background color codes: 40-49 and 100-107
  if ((ansiCode >= 40 && ansiCode <= 49) || (ansiCode >= 100 && ansiCode <= 107)) {
    styleState.lastBackgroundAdded = codeParts[0];
    return;
  }

  // Reset code: 0
  if (ansiCode === 0) {
    // Remove all own properties from the styleState object
    for (const property in styleState) {
      if (Object.prototype.hasOwnProperty.call(styleState, property)) {
        delete styleState[property];
      }
    }
    return;
  }

  // Custom mapping via xu lookup table
  const ansiMapping = xu[codeParts[0]];
  if (ansiMapping) {
    styleState[ansiMapping.set] = ansiMapping.to;
  }
}

module.exports = applyAnsiColorCode;