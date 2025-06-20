/**
 * Generates an ANSI escape sequence for a terminal hyperlink.
 *
 * This function constructs a terminal hyperlink escape sequence using the provided URL and display text.
 * If the display text is not provided, the URL will be used as the display text.
 *
 * @param {string} url - The URL to link to.
 * @param {string} displayText - The text to display for the hyperlink. If not provided, the URL will be used.
 * @returns {string} The constructed ANSI escape sequence for a terminal hyperlink.
 */
function generateTerminalHyperlinkSequence(url, displayText) {
  // Use displayText if provided; otherwise, fall back to url
  const textToDisplay = url || displayText;

  // Construct the ANSI escape sequence for a hyperlink
  // Format: ESC ] 8 ; ; <url> BEL <text> ESC ] 8 ; ; BEL
  // ESC = '\x1B', BEL = '\x07'
  return [
    '\x1B]',      // ESC ]
    '8',           // OSC 8
    ';',           // Parameter delimiter
    ';',           // Parameter delimiter
    textToDisplay, // URL or display text
    '\x07',       // BEL
    displayText,   // Display text
    '\x1B]',      // ESC ]
    '8',           // OSC 8
    ';',           // Parameter delimiter
    ';',           // Parameter delimiter
    '\x07'        // BEL
  ].join('');
}

module.exports = generateTerminalHyperlinkSequence;