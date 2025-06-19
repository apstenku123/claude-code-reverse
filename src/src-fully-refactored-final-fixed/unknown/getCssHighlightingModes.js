/**
 * Returns a set of syntax highlighting modes for CSS constructs such as !important, hex colors, and attribute selectors.
 *
 * @param {object} highlightingUtils - An object containing string mode definitions for syntax highlighting (e.g., APOS_STRING_MODE, QUOTE_STRING_MODE).
 * @returns {object} An object containing highlighting mode definitions for CSS features.
 */
const getCssHighlightingModes = (highlightingUtils) => {
  return {
    // Highlight '!important' keyword in CSS
    IMPORTANT: {
      className: "meta",
      begin: "!important"
    },
    // Highlight hex color codes (e.g., #fff, #ffffff)
    HEXCOLOR: {
      className: "number",
      begin: "#([a-F0-9]{6}|[a-F0-9]{3})"
    },
    // Highlight attribute selectors (e.g., [type="text"])
    ATTRIBUTE_SELECTOR_MODE: {
      className: "selector-attr",
      begin: /\[/, // Start with [
      end: /\]/,   // End with ]
      illegal: "$", // Disallow $ inside attribute selector
      contains: [
        highlightingUtils.APOS_STRING_MODE, // Allow single-quoted strings inside
        highlightingUtils.QUOTE_STRING_MODE // Allow double-quoted strings inside
      ]
    }
  };
};

module.exports = getCssHighlightingModes;
