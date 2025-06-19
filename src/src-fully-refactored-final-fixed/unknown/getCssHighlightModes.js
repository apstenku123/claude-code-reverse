/**
 * Returns a set of CSS-related highlight modes for syntax highlighting.
 *
 * @param {object} highlightHelpers - An object containing string mode definitions used for highlighting (e.g., single and double quoted string modes).
 * @returns {object} An object containing highlight mode definitions for '!important', hex color codes, and attribute selectors.
 */
const getCssHighlightModes = (highlightHelpers) => {
  return {
    // Matches the '!important' keyword in CSS
    IMPORTANT: {
      className: "meta",
      begin: "!important"
    },
    // Matches hex color codes like #fff or #ffffff
    HEXCOLOR: {
      className: "number",
      begin: "#([a-F0-9]{6}|[a-F0-9]{3})"
    },
    // Matches attribute selectors, e.g., [type="text"]
    ATTRIBUTE_SELECTOR_MODE: {
      className: "selector-attr",
      begin: /\[/,
      end: /\]/,
      // Disallow '$' inside attribute selectors
      illegal: "$",
      // Allow both single and double quoted strings inside attribute selectors
      contains: [
        highlightHelpers.APOS_STRING_MODE,
        highlightHelpers.QUOTE_STRING_MODE
      ]
    }
  };
};

module.exports = getCssHighlightModes;
