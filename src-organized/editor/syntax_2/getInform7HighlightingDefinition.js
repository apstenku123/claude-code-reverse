/**
 * Returns the syntax highlighting definition for the Inform 7 programming language.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} highlightJsInstance - The highlight.js instance (not used in this definition, but required by convention).
 * @returns {object} The Inform 7 language definition object for syntax highlighting.
 */
function getInform7HighlightingDefinition(highlightJsInstance) {
  return {
    name: "Inform 7",
    aliases: ["i7"],
    case_insensitive: true, // Inform 7 is case-insensitive
    keywords: {
      keyword: "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"
    },
    contains: [
      // String literals, supporting substitutions like [something]
      {
        className: "string",
        begin: '"',
        end: '"',
        relevance: 0,
        contains: [
          {
            className: "subst",
            begin: /\[/,
            end: /\]/
          }
        ]
      },
      // Section headers (e.g., Volume, Book, Part, etc.)
      {
        className: "section",
        begin: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
        end: /$/
      },
      // Rule definitions (e.g., Check, Carry out, etc.)
      {
        begin: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
        end: /:/,
        contains: [
          {
            begin: /\(This/,
            end: /\)/
          }
        ]
      },
      // Comments, which are enclosed in square brackets
      {
        className: "comment",
        begin: /\[/,
        end: /\]/,
        contains: ["self"] // Allows nested comments
      }
    ]
  };
}

module.exports = getInform7HighlightingDefinition;