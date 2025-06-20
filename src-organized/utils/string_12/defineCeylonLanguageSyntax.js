/**
 * Defines the syntax highlighting rules for the Ceylon programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing comment modes and utilities.
 * @returns {object} Language definition object for highlight.js
 */
function defineCeylonLanguageSyntax(hljs) {
  // List of Ceylon keywords
  const ceylonKeywords =
    "assembly module package import alias class interface object given value assign void function new of extends satisfies abstracts in out return break continue throw assert dynamic if else switch case for while try catch finally then let this outer super is exists nonempty";

  // List of Ceylon keyword modifiers
  const ceylonModifiers =
    "shared abstract formal default actual variable late native deprecated final sealed annotation suppressWarnings small";

  // List of Ceylon meta keywords
  const ceylonMetaKeywords = "doc by license see throws tagged";

  // Substitution block for string interpolation (`` ... ``)
  const substitutionBlock = {
    className: "subst",
    excludeBegin: true,
    excludeEnd: true,
    begin: /``/,
    end: /``/,
    keywords: ceylonKeywords,
    relevance: 10
  };

  // String and number literal patterns
  const literalPatterns = [
    {
      className: "string",
      begin: '"""',
      end: '"""',
      relevance: 10
    },
    {
      className: "string",
      begin: '"',
      end: '"',
      contains: [substitutionBlock] // Allow interpolation inside double-quoted strings
    },
    {
      className: "string",
      begin: "'",
      end: "'"
    },
    {
      className: "number",
      // Matches hexadecimal, binary, and decimal numbers with optional suffixes
      begin: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_]+)?(?:[eE][+-]?\\d+)?[kMGTPmunpf]?",
      relevance: 0
    }
  ];

  // Allow string interpolation inside double-quoted strings
  substitutionBlock.contains = literalPatterns;

  return {
    name: "Ceylon",
    keywords: {
      keyword: `${ceylonKeywords} ${ceylonModifiers}`,
      meta: ceylonMetaKeywords
    },
    // Illegal patterns: dollar not followed by 0 or 1, or hash not followed by hex digit
    illegal: "\\$[^01]|#[^0-9a-fA-F]",
    contains: [
      hljs.C_LINE_COMMENT_MODE, // Single-line comments
      hljs.COMMENT("/\*", "\\*/", {
        contains: ["self"] // Nested block comments
      }),
      {
        className: "meta",
        begin: '@[a-z]\\w*(?::"[^"]*")?' // Annotations
      },
      ...literalPatterns // String and number literals
    ]
  };
}

module.exports = defineCeylonLanguageSyntax;
