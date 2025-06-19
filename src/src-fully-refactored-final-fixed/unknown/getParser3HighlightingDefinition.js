/**
 * Returns the syntax highlighting definition for Parser3 language.
 *
 * @param {object} highlighter - The syntax highlighter object providing COMMENT and C_NUMBER_MODE helpers.
 * @returns {object} The Parser3 language definition object for syntax highlighting.
 */
function getParser3HighlightingDefinition(highlighter) {
  // Define a comment block that starts with '{' and ends with '}', can contain itself (nested)
  const nestedCurlyComment = highlighter.COMMENT(/\{/, /\}/, {
    contains: ["self"]
  });

  return {
    name: "Parser3",
    subLanguage: "xml",
    relevance: 0,
    contains: [
      // Single-line comment starting with '#'
      highlighter.COMMENT("^#", "$"),
      // Block comment starting with '^rem{' and ending with '}', can contain nested curly comments
      highlighter.COMMENT(/\^rem\{/, /\}/, {
        relevance: 10,
        contains: [nestedCurlyComment]
      }),
      // Meta directives like @BASE, @USE, etc.
      {
        className: "meta",
        begin: "^@(?:BASE|USE|CLASS|OPTIONS)$",
        relevance: 10
      },
      // Title definitions, e.g., @title[args][args]...
      {
        className: "title",
        begin: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
      },
      // Variable references like ${var} or $var
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
      // Standard number mode from the highlighter
      highlighter.C_NUMBER_MODE
    ]
  };
}

module.exports = getParser3HighlightingDefinition;