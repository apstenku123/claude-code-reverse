/**
 * Generates a set of syntax highlighting modes for CSS constructs.
 *
 * @param {object} syntaxHelpers - An object containing string mode definitions for syntax highlighting (e.g., single and double quoted string modes).
 * @returns {object} An object containing highlighting mode definitions for important keywords, hex colors, and attribute selectors in CSS.
 */
function createCssHighlightModes(syntaxHelpers) {
  return {
    // Matches '!important' keyword in CSS
    IMPORTANT: {
      className: "meta",
      begin: "!important"
    },
    // Matches hex color codes (e.g., #fff or #ffffff)
    HEXCOLOR: {
      className: "number",
      begin: "#([a-F0-9]{6}|[a-F0-9]{3})"
    },
    // Matches attribute selectors (e.g., [type="text"])
    ATTRIBUTE_SELECTOR_MODE: {
      className: "selector-attr",
      begin: /\[/, // Start of attribute selector
      end: /\]/,   // End of attribute selector
      illegal: "$", // Disallow '$' character inside attribute selector
      contains: [
        syntaxHelpers.APOS_STRING_MODE, // Allow single-quoted strings inside attribute selector
        syntaxHelpers.QUOTE_STRING_MODE // Allow double-quoted strings inside attribute selector
      ]
    }
  };
}

module.exports = createCssHighlightModes;
