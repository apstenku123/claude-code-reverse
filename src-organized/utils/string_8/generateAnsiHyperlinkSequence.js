/**
 * Generates an ANSI escape sequence for a hyperlink, used in supported terminals.
 *
 * @param {string} linkUrl - The URL to be used in the hyperlink. If not provided, fallbackText is used.
 * @param {string} fallbackText - The text to display for the hyperlink and as a fallback if linkUrl is not provided.
 * @returns {string} The constructed ANSI escape sequence representing the hyperlink.
 */
function generateAnsiHyperlinkSequence(linkUrl, fallbackText) {
  // ANSI escape sequence parts for hyperlinks:
  // '\x1B]8;;<url>\x07<text>\x1B]8;;\x07'
  // If linkUrl is falsy, fallbackText is used as the URL
  const url = linkUrl || fallbackText;

  // Construct the ANSI hyperlink escape sequence
  const ansiSequence = [
    '\x1B]', // OSC (Operating System Command) introducer
    '8',     // Hyperlink command
    ';',     // Parameter separator
    ';',     // Parameter separator
    url,     // The URL for the hyperlink
    '\x07',  // BEL character to end the OSC sequence
    fallbackText, // The text to display for the hyperlink
    '\x1B]', // OSC introducer to end the hyperlink
    '8',
    ';',
    ';',
    '\x07'   // BEL character to end the OSC sequence
  ].join("");

  return ansiSequence;
}

module.exports = generateAnsiHyperlinkSequence;