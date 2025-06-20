/**
 * Factory function to create a syntax highlighting definition for Augmented Backus-Naur Form (ABNF).
 *
 * @param {object} hljs - The highlight.js core object, providing utility modes and helpers.
 * @returns {object} Syntax highlighting definition for ABNF grammar.
 */
function createAugmentedBackusNaurFormDefinition(hljs) {
  /**
   * Regular expressions and illegal character patterns for ABNF rules.
   */
  const abnfPatterns = {
    // Matches a rule declaration: starts with a letter, followed by letters, digits, or hyphens
    ruleDeclaration: /^[a-zA-Z][a-zA-Z0-9-]*/,
    // Matches characters not allowed in ABNF
    unexpectedChars: /[!@#$^&',?+~`|:]/
  };

  /**
   * List of ABNF core keywords (terminal symbols).
   */
  const abnfKeywords = [
    "ALPHA", "BIT", "CHAR", "CR", "CRLF", "CTL", "DIGIT", "DQUOTE",
    "HEXDIG", "HTAB", "LF", "LWSP", "OCTET", "SP", "VCHAR", "WSP"
  ];

  /**
   * Comment mode: matches comments starting with ';' until end of line.
   * Uses highlight.js COMMENT utility.
   */
  const commentMode = hljs.COMMENT(/;/, /$/);

  /**
   * Symbol mode for binary values (e.g., %b1010 or %b1010-1100 or %b1010.1100).
   */
  const binarySymbolMode = {
    className: "symbol",
    begin: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
  };

  /**
   * Symbol mode for decimal values (e.g., %d10 or %d10-20 or %d10.20).
   */
  const decimalSymbolMode = {
    className: "symbol",
    begin: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
  };

  /**
   * Symbol mode for hexadecimal values (e.g., %x1A or %x1A-2B or %x1A.2B).
   */
  const hexSymbolMode = {
    className: "symbol",
    begin: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/
  };

  /**
   * Symbol mode for special ABNF symbols: %createInteractionAccessor(case-sensitive string) and %i (case-insensitive string).
   */
  const stringSymbolMode = {
    className: "symbol",
    begin: /%[si]/
  };

  /**
   * Attribute mode for rule declarations (e.g., ruleName = ...).
   * Uses a helper function `_d9` to combine the rule declaration regex with a lookahead for '='.
   */
  const ruleDeclarationMode = {
    className: "attribute",
    begin: _d9(abnfPatterns.ruleDeclaration, /(?=\s*=)/)
  };

  return {
    name: "Augmented Backus-Naur Form",
    illegal: abnfPatterns.unexpectedChars,
    keywords: abnfKeywords,
    contains: [
      ruleDeclarationMode,
      commentMode,
      binarySymbolMode,
      decimalSymbolMode,
      hexSymbolMode,
      stringSymbolMode,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  };
}

module.exports = createAugmentedBackusNaurFormDefinition;