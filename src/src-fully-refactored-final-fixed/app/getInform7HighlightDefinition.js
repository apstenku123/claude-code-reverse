/**
 * Returns the syntax highlighting definition for the Inform 7 programming language.
 * This definition can be used by syntax highlighters (e.g., highlight.js) to properly highlight Inform 7 code.
 *
 * @param {object} highlightEngine - The syntax highlighting engine instance (not used in this definition, but included for compatibility).
 * @returns {object} The Inform 7 language definition object for syntax highlighting.
 */
function getInform7HighlightDefinition(highlightEngine) {
  return {
    name: "Inform 7",
    aliases: ["i7"],
    case_insensitive: true,
    keywords: {
      keyword: "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"
    },
    contains: [
      // String literals, possibly containing substitutions like [something]
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
      // Rule definitions (e.g., Check, Carry out, Report, etc.)
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
      // Comments, enclosed in square brackets, can be nested
      {
        className: "comment",
        begin: /\[/,
        end: /\]/,
        contains: ["self"]
      }
    ]
  };
}

module.exports = getInform7HighlightDefinition;
