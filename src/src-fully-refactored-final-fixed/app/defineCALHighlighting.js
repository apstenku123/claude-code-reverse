/**
 * Defines syntax highlighting rules for the C/AL (C/SIDE) language for use with highlight.js.
 * @param {object} hljs - The highlight.js library instance, providing common modes and helpers.
 * @returns {object} Highlight.js language definition object for C/AL.
 */
function defineCALHighlighting(hljs) {
  // List of C/AL keywords
  const CAL_KEYWORDS = "div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var";

  // List of C/AL literals
  const CAL_LITERALS = "false true";

  // Comment modes: // line, { ... } block, (* ... *) block
  const COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(/\{/, /\}/, { relevance: 0 }),
    hljs.COMMENT(/\(\*/, /\*\)/, { relevance: 10 })
  ];

  // Single quoted string, with doubled single quote escaping
  const SINGLE_QUOTED_STRING = {
    className: "string",
    begin: /'/,
    end: /'/,
    contains: [
      { begin: /''/ } // Escaped single quote
    ]
  };

  // Character codes as strings, e.g. #65#66
  const CHARACTER_CODE_STRING = {
    className: "string",
    begin: /(#\d+)+/
  };

  // Number with optional decimal and suffix (DT, createCompatibleVersionChecker, BugReportForm)
  const NUMBER_WITH_SUFFIX = {
    className: "number",
    begin: "\\b\\d+(\\.\\d+)?(DT|createCompatibleVersionChecker|BugReportForm)",
    relevance: 0
  };

  // Double quoted string
  const DOUBLE_QUOTED_STRING = {
    className: "string",
    begin: '"',
    end: '"'
  };

  // Function/procedure definition
  const PROCEDURE_DEFINITION = {
    className: "function",
    beginKeywords: "procedure",
    end: /[:;]/,
    keywords: "procedure|10",
    contains: [
      hljs.TITLE_MODE,
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: CAL_KEYWORDS,
        contains: [SINGLE_QUOTED_STRING, CHARACTER_CODE_STRING]
      },
      ...COMMENT_MODES
    ]
  };

  // Object/class definition (Table, Form, Report, etc.)
  const OBJECT_DEFINITION = {
    className: "class",
    begin: "OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",
    returnBegin: true,
    contains: [hljs.TITLE_MODE, PROCEDURE_DEFINITION]
  };

  return {
    name: "C/AL",
    case_insensitive: true,
    keywords: {
      keyword: CAL_KEYWORDS,
      literal: CAL_LITERALS
    },
    illegal: /\/\*/, // Disallow C-style block comments
    contains: [
      SINGLE_QUOTED_STRING,
      CHARACTER_CODE_STRING,
      NUMBER_WITH_SUFFIX,
      DOUBLE_QUOTED_STRING,
      hljs.NUMBER_MODE,
      OBJECT_DEFINITION,
      PROCEDURE_DEFINITION
    ]
  };
}

module.exports = defineCALHighlighting;