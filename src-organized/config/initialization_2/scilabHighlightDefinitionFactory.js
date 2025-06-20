/**
 * Factory function that generates a highlight.js language definition for Scilab syntax highlighting.
 *
 * @param {object} hljs - The highlight.js core object, providing common modes and helpers.
 * @returns {object} Scilab language definition for highlight.js
 */
function scilabHighlightDefinitionFactory(hljs) {
  // Define number and string modes for Scilab
  const numberAndStringModes = [
    hljs.C_NUMBER_MODE,
    {
      className: "string",
      begin: "'|\"",
      end: "'|\"",
      contains: [
        hljs.BACKSLASH_ESCAPE,
        {
          // Handles doubled single quotes inside strings
          begin: "''"
        }
      ]
    }
  ];

  return {
    name: "Scilab",
    aliases: ["sci"],
    keywords: {
      $pattern: /%?\w+/,
      keyword:
        "abort break case clear catch continue do elseif else endfunction end for function global if pause return resume select try then while",
      literal:
        "%f %F %processRuleBeginHandlers %BugReportForm %getEndIndexOfInteractionEntry %eps %inf %nan %e %i %z %createInteractionAccessor",
      built_in:
        "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan type typename warning zeros matrix"
    },
    // Illegal patterns: double quote, #, /*, or whitespace followed by word
    illegal: '("|#|/\*|\\s+/\w+)',
    contains: [
      {
        className: "function",
        beginKeywords: "function",
        end: "$",
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: "params",
            begin: "\\(",
            end: "\\)"
          }
        ]
      },
      {
        // Handles matrix or variable names followed by dot or quote
        begin: "[a-zA-Z_][a-zA-Z_0-9]*[\\.']+",
        relevance: 0
      },
      {
        // Handles matrix definitions
        begin: "\\[",
        end: "\\][\\.']*",
        relevance: 0,
        contains: numberAndStringModes
      },
      // Single-line comments
      hljs.COMMENT("//", "$")
    ].concat(numberAndStringModes)
  };
}

module.exports = scilabHighlightDefinitionFactory;