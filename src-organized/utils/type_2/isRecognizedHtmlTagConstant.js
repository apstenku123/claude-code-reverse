/**
 * Determines if the provided tag constant matches a recognized HTML tag constant from the f0 object.
 *
 * @param {string} tagConstant - The tag constant to check (should be a string, e.g., f0.initializeSyntaxHighlighting, f0.handleElementProcessing, etc.).
 * @returns {boolean} True if the tag constant matches a recognized HTML tag constant, otherwise false.
 */
function isRecognizedHtmlTagConstant(tagConstant) {
  // Check the length of the tag constant string and compare against known f0 constants
  switch (tagConstant.length) {
    case 1:
      // Single character tag, e.g., 'initializeSyntaxHighlighting'
      return tagConstant === f0.initializeSyntaxHighlighting;
    case 2:
      // Two character tags, e.g., 'handleElementProcessing', 'RP', etc.
      return (
        tagConstant === f0.handleElementProcessing ||
        tagConstant === f0.RP ||
        tagConstant === f0.RT ||
        tagConstant === f0.createAccessorFunctionProxy ||
        tagConstant === f0.DT ||
        tagConstant === f0.LI ||
        tagConstant === f0.TD ||
        tagConstant === f0.TH ||
        tagConstant === f0.TR
      );
    case 3:
      // Three character tag, e.g., 'RTC'
      return tagConstant === f0.RTC;
    case 5:
      // Five character tags, e.g., 'TBODY', 'TFOOT', 'THEAD'
      return (
        tagConstant === f0.TBODY ||
        tagConstant === f0.TFOOT ||
        tagConstant === f0.THEAD
      );
    case 6:
      // Six character tag, e.g., 'OPTION'
      return tagConstant === f0.OPTION;
    case 7:
      // Seven character tag, e.g., 'CAPTION'
      return tagConstant === f0.CAPTION;
    case 8:
      // Eight character tags, e.g., 'OPTGROUP', 'COLGROUP'
      return (
        tagConstant === f0.OPTGROUP ||
        tagConstant === f0.COLGROUP
      );
    default:
      // If the length doesn'processRuleBeginHandlers match any known tag, return false
      return false;
  }
}

module.exports = isRecognizedHtmlTagConstant;