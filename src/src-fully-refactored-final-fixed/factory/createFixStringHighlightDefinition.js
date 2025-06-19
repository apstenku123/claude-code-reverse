/**
 * Factory function that creates a syntax highlighting definition for FIX (Financial Information eXchange) protocol strings.
 * The returned object is intended for use with syntax highlighters (e.g., highlight.js) to parse and highlight FIX message fields and values.
 *
 * @param {object} options - Optional configuration object (currently unused, reserved for future use).
 * @returns {object} Syntax highlighting definition for FIX protocol strings.
 */
function createFixStringHighlightDefinition(options) {
  return {
    name: "FIX",
    contains: [
      {
        // Match a FIX field (everything except SOH (\u0001) and Unicode symbol for SOH (\u2401))
        begin: /[^\u2401\u0001]+/,
        end: /[\u2401\u0001]/,
        excludeEnd: true, // Exclude the delimiter from the match
        returnBegin: true, // Start match at the beginning of the field
        returnEnd: false, // normalizeToError not return the end delimiter
        contains: [
          {
            // Match the attribute (tag) part before the '=' sign
            begin: /([^\u2401\u0001=]+)/,
            end: /=([^\u2401\u0001=]+)/,
            returnEnd: true, // Include the '=' in the match
            returnBegin: false, // normalizeToError not include the beginning in the match
            className: "attr" // Highlight as attribute
          },
          {
            // Match the value part after the '=' sign, up to the delimiter
            begin: /=/,
            end: /([\u2401\u0001])/,
            excludeEnd: true, // Exclude the delimiter from the match
            excludeBegin: true, // Exclude the '=' from the match
            className: "string" // Highlight as string/value
          }
        ]
      }
    ],
    case_insensitive: true // FIX tags are case-insensitive
  };
}

module.exports = createFixStringHighlightDefinition;