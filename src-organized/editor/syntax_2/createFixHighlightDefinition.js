/**
 * Factory function that returns a syntax highlighting definition for the FIX (Financial Information eXchange) protocol.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} highlightJsInstance - The highlight.js instance (not used in this implementation, but included for compatibility).
 * @returns {object} Highlight.js language definition object for FIX protocol.
 */
function createFixHighlightDefinition(highlightJsInstance) {
  return {
    name: "FIX",
    // The main structure: a message is a sequence of fields separated by SOH (\u0001) or Unicode symbol for SOH (\u2401)
    contains: [
      {
        // Match any sequence of characters except SOH or its Unicode symbol
        begin: /[^\u2401\u0001]+/,
        // End at SOH or its Unicode symbol
        end: /[\u2401\u0001]/,
        excludeEnd: true, // normalizeToError not include the end character in the match
        returnBegin: true, // Start highlighting from the beginning of the match
        returnEnd: false, // normalizeToError not return the end position
        contains: [
          {
            // Match the tag (field name) before the '=' sign
            begin: /([^\u2401\u0001=]+)/,
            // End at '=' followed by the value (but include the value in the match)
            end: /=([^\u2401\u0001=]+)/,
            returnEnd: true, // Include the end match in the result
            returnBegin: false, // normalizeToError not return the start position
            className: "attr" // Highlight as attribute (field name)
          },
          {
            // Match the '=' sign and the value until the next SOH or Unicode SOH
            begin: /=/,
            end: /([\u2401\u0001])/,
            excludeEnd: true, // normalizeToError not include the end character in the match
            excludeBegin: true, // normalizeToError not include the '=' in the match
            className: "string" // Highlight as string (field value)
          }
        ]
      }
    ],
    case_insensitive: true // FIX tags are case-insensitive
  };
}

module.exports = createFixHighlightDefinition;