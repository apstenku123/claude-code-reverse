/**
 * Factory function that creates a set of CSS syntax highlighting modes.
 *
 * @param {Object} syntaxHelpers - An object containing string mode definitions for attribute selectors.
 * @param {Object} syntaxHelpers.APOS_STRING_MODE - Mode for single-quoted strings.
 * @param {Object} syntaxHelpers.QUOTE_STRING_MODE - Mode for double-quoted strings.
 * @returns {Object} An object containing CSS highlighting mode definitions for '!important', hex colors, and attribute selectors.
 */
const createCssHighlightModes = (syntaxHelpers) => {
  return {
    // Matches '!important' keyword in CSS
    IMPORTANT: {
      className: "meta",
      begin: "!important"
    },
    // Matches hex color values like #fff or #ffffff
    HEXCOLOR: {
      className: "number",
      begin: "#([a-F0-9]{6}|[a-F0-9]{3})"
    },
    // Matches CSS attribute selectors, e.g., [type="text"]
    ATTRIBUTE_SELECTOR_MODE: {
      className: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$", // Disallow '$' inside attribute selectors
      contains: [
        syntaxHelpers.APOS_STRING_MODE, // Allow single-quoted strings inside attribute selectors
        syntaxHelpers.QUOTE_STRING_MODE // Allow double-quoted strings inside attribute selectors
      ]
    }
  };
};

module.exports = createCssHighlightModes;
