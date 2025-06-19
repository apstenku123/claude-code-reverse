/**
 * Factory function to create a syntax highlighting configuration for Scilab language.
 *
 * @param {object} syntaxHelpers - An object containing syntax highlighting helper modes and utilities.
 * @returns {object} Highlight.js language definition object for Scilab.
 */
function createScilabHighlightConfig(syntaxHelpers) {
  // Define string and number matching modes for Scilab
  const stringAndNumberModes = [
    syntaxHelpers.C_NUMBER_MODE,
    {
      className: "string",
      begin: `'|"`, // Matches either single or double quote
      end: `'|"`,
      contains: [
        syntaxHelpers.BACKSLASH_ESCAPE,
        {
          begin: "''" // Handles escaped single quotes inside strings
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
    // Illegal patterns for Scilab (e.g., unclosed strings, comments, or invalid identifiers)
    illegal: '("|#|/\*|\\s+/\w+)',
    contains: [
      // Function definition
      {
        className: "function",
        beginKeywords: "function",
        end: "$",
        contains: [
          syntaxHelpers.UNDERSCORE_TITLE_MODE,
          {
            className: "params",
            begin: "\\(",
            end: "\\)"
          }
        ]
      },
      // Dotted or transposed variable names (e.g., a.', b..)
      {
        begin: "[a-zA-Z_][a-zA-Z_0-9]*[\\.']+",
        relevance: 0
      },
      // Matrix or array definitions (e.g., [1 2 3])
      {
        begin: "\\[",
        end: "\\][\\.']*",
        relevance: 0,
        contains: stringAndNumberModes
      },
      // Single-line comments
      syntaxHelpers.COMMENT("//", "$")
    ].concat(stringAndNumberModes)
  };
}

module.exports = createScilabHighlightConfig;