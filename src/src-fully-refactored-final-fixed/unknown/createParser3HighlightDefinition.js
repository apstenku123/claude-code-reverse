/**
 * Constructs the syntax highlighting definition for Parser3 language.
 *
 * @param {object} hljs - The highlighting library instance, expected to provide COMMENT and C_NUMBER_MODE helpers.
 * @returns {object} The Parser3 language definition object for syntax highlighting.
 */
function createParser3HighlightDefinition(hljs) {
  // Define a COMMENT mode for curly-brace comments, allowing nested comments
  const curlyBraceComment = hljs.COMMENT(/\{/, /\}/, {
    contains: ["self"] // Allow nested curly-brace comments
  });

  return {
    name: "Parser3",
    subLanguage: "xml",
    relevance: 0,
    contains: [
      // Line comments starting with #
      hljs.COMMENT("^#", "$"),
      // REM comments with nested curly-brace comments
      hljs.COMMENT(/\^rem\{/, /\}/, {
        relevance: 10,
        contains: [curlyBraceComment]
      }),
      // Meta directives like @BASE, @USE, etc.
      {
        className: "meta",
        begin: "^@(?:BASE|USE|CLASS|OPTIONS)$",
        relevance: 10
      },
      // Title definitions with @ and brackets
      {
        className: "title",
        begin: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
      },
      // Variable interpolation
      {
        className: "variable",
        begin: /\$\{?[\w\-.:]+\}?/
      },
      // Keywords starting with ^
      {
        className: "keyword",
        begin: /\^[\w\-.:]+/
      },
      // Hexadecimal numbers starting with ^#
      {
        className: "number",
        begin: "\\^#[0-9a-fA-F]+"
      },
      // Standard number mode from hljs
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = createParser3HighlightDefinition;