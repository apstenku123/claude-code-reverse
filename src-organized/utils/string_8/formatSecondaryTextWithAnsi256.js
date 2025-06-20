/**
 * Formats the provided secondary text using an ANSI 256 color code.
 *
 * This function retrieves the secondary text color code from the theme configuration,
 * then applies isBlobOrFileLikeObject to the given text using the FA.ansi256 formatter.
 *
 * @returns {string} The formatted text string with ANSI 256 color applied.
 */
function formatSecondaryTextWithAnsi256() {
  // Retrieve the secondary text color code from the theme configuration
  const secondaryTextColorCode = H4().secondaryText;

  // The text to be formatted
  const textToFormat = De0;

  // Apply the ANSI 256 color formatting to the text
  const formattedText = FA.ansi256(secondaryTextColorCode)(textToFormat);

  return formattedText;
}

module.exports = formatSecondaryTextWithAnsi256;