/**
 * Defines the syntax highlighting rules for Extended Backus-Naur Form (EBNF).
 *
 * @param {object} hljs - The highlight.js instance providing utility modes and helpers.
 * @returns {object} Syntax definition object for EBNF highlighting.
 */
function defineExtendedBackusNaurFormSyntax(hljs) {
  // Define comment mode for EBNF: comments are enclosed in ( * ... * )
  const commentMode = hljs.COMMENT(/\(\*/, /\*\)/);

  // Define attribute mode: matches lines starting with optional spaces, then attribute names
  const attributeMode = {
    className: "attribute",
    begin: /^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/
  };

  // Define value mode: matches assignments and their values, including strings and meta
  const valueMode = {
    begin: /=/,
    end: /[.;]/,
    contains: [
      commentMode,
      {
        className: "meta",
        begin: /\?.*\?/
      },
      {
        className: "string",
        variants: [
          hljs.APOS_STRING_MODE, // single-quoted strings
          hljs.QUOTE_STRING_MODE, // double-quoted strings
          {
            begin: "`",
            end: "`"
          }
        ]
      }
    ]
  };

  // Return the full EBNF syntax definition for highlight.js
  return {
    name: "Extended Backus-Naur Form",
    illegal: /\s/, // illegal to have non-whitespace outside defined modes
    contains: [commentMode, attributeMode, valueMode]
  };
}

module.exports = defineExtendedBackusNaurFormSyntax;