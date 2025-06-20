/**
 * Returns the syntax highlighting definition for Parser3 language.
 *
 * @param {object} syntaxHighlighter - The syntax highlighter object, expected to provide COMMENT and C_NUMBER_MODE utilities.
 * @returns {object} The Parser3 language definition object for syntax highlighting.
 */
function getParser3SyntaxDefinition(syntaxHighlighter) {
  // Define a comment block for curly-brace comments, allowing nested comments
  const curlyBraceComment = syntaxHighlighter.COMMENT(/\{/, /\}/, {
    contains: ["self"]
  });

  return {
    name: "Parser3",
    subLanguage: "xml",
    relevance: 0,
    contains: [
      // Line comment starting with #
      syntaxHighlighter.COMMENT("^#", "$"),
      // REM comment block with high relevance, can contain nested curly-brace comments
      syntaxHighlighter.COMMENT(/\^rem\{/, /\}/, {
        relevance: 10,
        contains: [curlyBraceComment]
      }),
      // Meta directives like @BASE, @USE, etc.
      {
        className: "meta",
        begin: "^@(?:BASE|USE|CLASS|OPTIONS)$",
        relevance: 10
      },
      // Title definitions, e.g., @title[foo][bar]
      {
        className: "title",
        begin: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
      },
      // Variable references, e.g., ${var} or $var
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
      // Standard number mode from the syntax highlighter
      syntaxHighlighter.C_NUMBER_MODE
    ]
  };
}

module.exports = getParser3SyntaxDefinition;