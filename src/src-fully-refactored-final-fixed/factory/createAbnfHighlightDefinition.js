/**
 * Generates a syntax highlighting definition for Augmented Backus-Naur Form (ABNF).
 *
 * @param {object} hljs - The highlight.js instance, providing utility modes and helpers.
 * @returns {object} The ABNF language definition object for highlight.js.
 */
function createAbnfHighlightDefinition(hljs) {
  // Regular expressions for ABNF rule declarations and illegal characters
  const abnfPatterns = {
    ruleDeclaration: /^[a-zA-Z][a-zA-Z0-9-]*/, // Rule names start with a letter, followed by letters, digits, or hyphens
    unexpectedChars: /[!@#$^&',?+~`|:]/ // Characters not allowed in ABNF
  };

  // List of ABNF core rule keywords
  const abnfKeywords = [
    "ALPHA", "BIT", "CHAR", "CR", "CRLF", "CTL", "DIGIT", "DQUOTE",
    "HEXDIG", "HTAB", "LF", "LWSP", "OCTET", "SP", "VCHAR", "WSP"
  ];

  // ABNF comment mode: comments start with ';' and go to end of line
  const abnfCommentMode = hljs.COMMENT(/;/, /$/);

  // ABNF binary value mode: e.g., %b1010 or %b1010-1100 or %b1010.1100
  const abnfBinaryValueMode = {
    className: "symbol",
    begin: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
  };

  // ABNF decimal value mode: e.g., %d65 or %d65-90 or %d65.90
  const abnfDecimalValueMode = {
    className: "symbol",
    begin: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
  };

  // ABNF hexadecimal value mode: e.g., %x41 or %x41-5A or %x41.5A
  const abnfHexValueMode = {
    className: "symbol",
    begin: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/
  };

  // ABNF prose value mode: e.g., %createInteractionAccessor or %i
  const abnfProseValueMode = {
    className: "symbol",
    begin: /%[si]/
  };

  // ABNF rule declaration mode: matches rule names before '='
  // _d9 is assumed to be a helper that combines two regexps for highlight.js
  const abnfRuleDeclarationMode = {
    className: "attribute",
    begin: _d9(abnfPatterns.ruleDeclaration, /(?=\s*=)/) // Lookahead for '='
  };

  return {
    name: "Augmented Backus-Naur Form",
    illegal: abnfPatterns.unexpectedChars,
    keywords: abnfKeywords,
    contains: [
      abnfRuleDeclarationMode,
      abnfCommentMode,
      abnfBinaryValueMode,
      abnfDecimalValueMode,
      abnfHexValueMode,
      abnfProseValueMode,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  };
}

module.exports = createAbnfHighlightDefinition;