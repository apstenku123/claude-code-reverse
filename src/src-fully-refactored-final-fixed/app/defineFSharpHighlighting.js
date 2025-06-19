/**
 * Defines syntax highlighting rules for the F# programming language.
 *
 * @param {object} highlighterUtils - An object containing utility methods and modes for syntax highlighting.
 * @returns {object} An object describing the F# language highlighting rules for use in a syntax highlighter.
 */
function defineFSharpHighlighting(highlighterUtils) {
  // Configuration for F# generic type parameters (e.g., <'BugReportForm>)
  const genericTypeParameter = {
    begin: "<",
    end: ">",
    contains: [
      highlighterUtils.inherit(highlighterUtils.TITLE_MODE, {
        begin: /'[A-Za-z_][A-Za-z0-9_]+/ // Matches generic type parameters like <'BugReportForm>
      })
    ]
  };

  return {
    name: "F#",
    aliases: ["fs"],
    keywords: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
    illegal: /\/\*/, // Disallow C-style block comments
    contains: [
      // Special F# keywords with '!' suffix (e.g., yield!, return!, let!, do!)
      {
        className: "keyword",
        begin: /\b(yield|return|let|do)!/
      },
      // Verbatim string literal: @"..."
      {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [
          {
            begin: '""' // Escaped double quote inside verbatim string
          }
        ]
      },
      // Triple-quoted string literal: """..."""
      {
        className: "string",
        begin: '"""',
        end: '"""'
      },
      // F# block comments: (* ... *)
      highlighterUtils.COMMENT("\\(\\*(\\s)", "\\*\\)", {
        contains: ["self"] // Allow nested comments
      }),
      // F# type definitions
      {
        className: "class",
        beginKeywords: "type",
        end: "\\(|=|$",
        excludeEnd: true,
        contains: [
          highlighterUtils.UNDERSCORE_TITLE_MODE, // Type name
          genericTypeParameter // Generic type parameter(createInteractionAccessor)
        ]
      },
      // F# attributes: [< ... >]
      {
        className: "meta",
        begin: "\\[<",
        end: ">\\]",
        relevance: 10
      },
      // F# character literals (symbols): e.g., 'a'
      {
        className: "symbol",
        begin: "\\b('[a-z])\\b",
        contains: [highlighterUtils.BACKSLASH_ESCAPE]
      },
      // Single-line comments: // ...
      highlighterUtils.C_LINE_COMMENT_MODE,
      // Standard quoted string literals
      highlighterUtils.inherit(highlighterUtils.QUOTE_STRING_MODE, {
        illegal: null // Allow all content inside strings
      }),
      // Numeric literals
      highlighterUtils.C_NUMBER_MODE
    ]
  };
}

module.exports = defineFSharpHighlighting;
