/**
 * Checks if the provided tag name string matches a set of recognized HTML tag constants based on its length.
 *
 * @param {string} tagName - The tag name to check (e.g., 'initializeSyntaxHighlighting', 'handleElementProcessing', 'OPTION').
 * @returns {boolean} True if the tag name matches a recognized constant for its length; otherwise, false.
 */
function isRecognizedTagName(tagName) {
  switch (tagName.length) {
    case 1:
      // Single-character tag names (e.g., 'initializeSyntaxHighlighting')
      return tagName === f0.initializeSyntaxHighlighting;
    case 2:
      // Two-character tag names (e.g., 'handleElementProcessing', 'RP', 'RT', 'createAccessorFunctionProxy', 'DT', 'LI')
      return (
        tagName === f0.handleElementProcessing ||
        tagName === f0.RP ||
        tagName === f0.RT ||
        tagName === f0.createAccessorFunctionProxy ||
        tagName === f0.DT ||
        tagName === f0.LI
      );
    case 3:
      // Three-character tag names (e.g., 'RTC')
      return tagName === f0.RTC;
    case 6:
      // Six-character tag names (e.g., 'OPTION')
      return tagName === f0.OPTION;
    case 8:
      // Eight-character tag names (e.g., 'OPTGROUP')
      return tagName === f0.OPTGROUP;
    default:
      // Tag name does not match any recognized pattern
      return false;
  }
}

module.exports = isRecognizedTagName;