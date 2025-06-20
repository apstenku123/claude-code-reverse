/**
 * Defines syntax highlighting rules for the Ceylon programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing comment modes and utilities.
 * @returns {object} Highlight.js language definition for Ceylon.
 */
function defineCeylonHighlighting(hljs) {
  // Ceylon language keywords
  const ceylonKeywords = "assembly module package import alias class interface object given value assign void function new of extends satisfies abstracts in out return break continue throw assert dynamic if else switch case for while try catch finally then let this outer super is exists nonempty";
  // Ceylon language type and modifier keywords
  const ceylonModifiers = "shared abstract formal default actual variable late native deprecated final sealed annotation suppressWarnings small";
  // Ceylon meta keywords
  const ceylonMetaKeywords = "doc by license see throws tagged";

  // Substitution highlighting inside strings (``...``)
  const substitution = {
    className: "subst",
    excludeBegin: true,
    excludeEnd: true,
    begin: /``/,
    end: /``/,
    keywords: ceylonKeywords,
    relevance: 10
  };

  // String and number modes
  const stringAndNumberModes = [
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
      contains: [substitution] // Allow substitutions inside double-quoted strings
    },
    {
      className: "string",
      begin: "'",
      end: "'"
    },
    {
      className: "number",
      // Matches hexadecimal, binary, and decimal numbers with optional suffixes
      begin: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?",
      relevance: 0
    }
  ];

  // Allow substitutions inside double-quoted strings
  substitution.contains = stringAndNumberModes;

  return {
    name: "Ceylon",
    keywords: {
      keyword: ceylonKeywords + " " + ceylonModifiers,
      meta: ceylonMetaKeywords
    },
    // Illegal patterns: non-binary $-prefixed or non-hex #
    illegal: "\\$[^01]|#[^0-9a-fA-F]",
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT("/\*", "\\*/", {
        contains: ["self"]
      }),
      {
        className: "meta",
        begin: '@[a-z]\\w*(?::"[^"]*")?'
      },
      ...stringAndNumberModes
    ]
  };
}

module.exports = defineCeylonHighlighting;