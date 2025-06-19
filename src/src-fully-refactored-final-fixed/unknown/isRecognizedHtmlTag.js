/**
 * Checks if the provided tag name matches a recognized HTML tag constant from the f0 object.
 *
 * @param {string} tagName - The tag name to check (e.g., 'initializeSyntaxHighlighting', 'handleElementProcessing', 'RTC', etc.).
 * @returns {boolean} True if the tag name matches a recognized HTML tag constant, false otherwise.
 */
function isRecognizedHtmlTag(tagName) {
  // Ensure tagName is a string
  if (typeof tagName !== 'string') {
    return false;
  }

  switch (tagName.length) {
    case 1:
      // Single-character tag (e.g., 'initializeSyntaxHighlighting')
      return tagName === f0.initializeSyntaxHighlighting;
    case 2:
      // Two-character tags (e.g., 'handleElementProcessing', 'RP', 'RT', 'createAccessorFunctionProxy', 'DT', 'LI', 'TD', 'TH', 'TR')
      return tagName === f0.handleElementProcessing ||
             tagName === f0.RP ||
             tagName === f0.RT ||
             tagName === f0.createAccessorFunctionProxy ||
             tagName === f0.DT ||
             tagName === f0.LI ||
             tagName === f0.TD ||
             tagName === f0.TH ||
             tagName === f0.TR;
    case 3:
      // Three-character tag (e.g., 'RTC')
      return tagName === f0.RTC;
    case 5:
      // Five-character tags (e.g., 'TBODY', 'TFOOT', 'THEAD')
      return tagName === f0.TBODY ||
             tagName === f0.TFOOT ||
             tagName === f0.THEAD;
    case 6:
      // Six-character tag (e.g., 'OPTION')
      return tagName === f0.OPTION;
    case 7:
      // Seven-character tag (e.g., 'CAPTION')
      return tagName === f0.CAPTION;
    case 8:
      // Eight-character tags (e.g., 'OPTGROUP', 'COLGROUP')
      return tagName === f0.OPTGROUP ||
             tagName === f0.COLGROUP;
    default:
      // Tag name does not match any recognized length
      return false;
  }
}

module.exports = isRecognizedHtmlTag;