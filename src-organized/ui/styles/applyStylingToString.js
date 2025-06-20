/**
 * Applies ANSI styling to a string based on the provided style context.
 *
 * @param {Object} styleContext - The style context object containing styling information.
 * @param {number} styleContext.level - The level of styling to apply. If 0 or less, styling is skipped.
 * @param {boolean} styleContext._isEmpty - Indicates if the style context is empty.
 * @param {Object} styleContext._styler - The styler object containing open/close sequences and parent styler.
 * @param {string} styleContext._styler.openAll - The ANSI sequence to open all styles.
 * @param {string} styleContext._styler.closeAll - The ANSI sequence to close all styles.
 * @param {string} styleContext._styler.open - The ANSI sequence to open the current style.
 * @param {string} styleContext._styler.close - The ANSI sequence to close the current style.
 * @param {Object} styleContext._styler.parent - The parent styler object, if any.
 * @param {string} inputString - The string to which styling should be applied.
 * @returns {string} The styled string, or the original string if no styling is applied.
 */
function applyStylingToString(styleContext, inputString) {
  // If styling level is 0 or less, or inputString is falsy, return empty string or inputString
  if (styleContext.level <= 0 || !inputString) {
    return styleContext._isEmpty ? "" : inputString;
  }

  const styler = styleContext._styler;
  if (styler === undefined) {
    return inputString;
  }

  const {
    openAll: openAllStyles,
    closeAll: closeAllStyles
  } = styler;

  let styledString = inputString;

  // If the string already contains ANSI escape codes, recursively re-apply styles for nested stylers
  if (styledString.indexOf("\x1B") !== -1) {
    let currentStyler = styler;
    while (currentStyler !== undefined) {
      styledString = bB5(styledString, currentStyler.close, currentStyler.open);
      currentStyler = currentStyler.parent;
    }
  }

  // If the string contains a newline, apply multi-line styling
  const firstNewlineIndex = styledString.indexOf("\n");
  if (firstNewlineIndex !== -1) {
    styledString = gB5(styledString, closeAllStyles, openAllStyles, firstNewlineIndex);
  }

  // Wrap the string with the opening and closing style sequences
  return openAllStyles + styledString + closeAllStyles;
}

module.exports = applyStylingToString;
