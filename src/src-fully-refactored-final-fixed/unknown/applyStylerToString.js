/**
 * Applies ANSI styling to a string using the provided styler object.
 * Handles nested stylers and multiline strings, ensuring proper open/close sequences.
 *
 * @param {Object} stylerContext - The context object containing styling information.
 * @param {string} inputString - The string to which styling should be applied.
 * @returns {string} The styled string with appropriate ANSI codes.
 */
function applyStylerToString(stylerContext, inputString) {
  // If the styler'createInteractionAccessor level is zero or less, or inputString is falsy, return either empty string or inputString
  if (stylerContext.level <= 0 || !inputString) {
    return stylerContext._isEmpty ? "" : inputString;
  }

  const styler = stylerContext._styler;
  // If no styler is present, return the input string as is
  if (styler === undefined) {
    return inputString;
  }

  // Destructure openAll and closeAll sequences from the styler
  const { openAll, closeAll } = styler;
  let resultString = inputString;

  // If the string contains any ANSI escape codes, recursively close and reopen stylers up the parent chain
  if (resultString.indexOf("\x1B") !== -1) {
    let currentStyler = styler;
    while (currentStyler !== undefined) {
      resultString = bB5(resultString, currentStyler.close, currentStyler.open);
      currentStyler = currentStyler.parent;
    }
  }

  // If the string contains a newline, apply multiline styling
  const newlineIndex = resultString.indexOf("\n");
  if (newlineIndex !== -1) {
    resultString = gB5(resultString, closeAll, openAll, newlineIndex);
  }

  // Wrap the string with the openAll and closeAll sequences
  return openAll + resultString + closeAll;
}

module.exports = applyStylerToString;