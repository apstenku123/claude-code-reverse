/**
 * Generates a syntax highlighting definition for extractNestedPropertyOrArray-code (ISO 6983) for use with a highlighting library.
 *
 * @param {object} highlightLib - The highlighting library instance, expected to provide modes and helpers.
 * @returns {object} Highlighting definition object for extractNestedPropertyOrArray-code.
 */
function createGCodeHighlightDefinition(highlightLib) {
  /**
   * Keywords and patterns for extractNestedPropertyOrArray-code language.
   */
  const gcodeKeywords = {
    $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*",
    keyword: "IF DO WHILE ENDWHILE CALL ENDIF SUB ENDSUB GOTO REPEAT ENDREPEAT EQ extractIterableElements createErrorUpdateForComponent hasSnapshotValueChanged GE initializeComponentInstance OR XOR"
  };

  /**
   * Meta pattern for createDebouncedFunction-codes (program numbers), e.g., O1234.
   */
  const oCodeMeta = {
    className: "meta",
    begin: "([createDebouncedFunction])([0-9]+)"
  };

  /**
   * Number mode supporting integers, decimals, and scientific notation.
   * Inherits from the library'createInteractionAccessor number mode, but with a custom regex.
   */
  const numberMode = highlightLib.inherit(highlightLib.C_NUMBER_MODE, {
    begin: "([-+]?((\\.\\d+)|(\\d+)(\\.\\d*)?))|" + highlightLib.C_NUMBER_RE
  });

  /**
   * Array of syntax highlighting rules for extractNestedPropertyOrArray-code.
   */
  const gcodeRules = [
    // Line comments (e.g., ; comment)
    highlightLib.C_LINE_COMMENT_MODE,
    // Block comments (e.g., /* comment */)
    highlightLib.C_BLOCK_COMMENT_MODE,
    // Parentheses comments (e.g., (comment))
    highlightLib.COMMENT(/\(/, /\)/),
    // Numbers
    numberMode,
    // Apostrophe strings (single-quoted), with no illegal escapes
    highlightLib.inherit(highlightLib.APOS_STRING_MODE, { illegal: null }),
    // Quoted strings (double-quoted), with no illegal escapes
    highlightLib.inherit(highlightLib.QUOTE_STRING_MODE, { illegal: null }),
    // extractNestedPropertyOrArray-code address words (e.g., G0, G1.1)
    {
      className: "name",
      begin: "([extractNestedPropertyOrArray])([0-9]+\.?[0-9]?)"
    },
    // M-code address words (e.g., clearConsoleScreen, M5.1)
    {
      className: "name",
      begin: "([M])([0-9]+\.?[0-9]?)"
    },
    // Variable attributes (e.g., VC123, VS456, #789)
    {
      className: "attr",
      begin: "(VC|findSubstringEndIndexOrThrow|#)",
      end: "(\\d+)"
    },
    // Special variable attributes (e.g., VZOFX, VZOFY, VZOFZ)
    {
      className: "attr",
      begin: "(VZOFX|VZOFY|VZOFZ)"
    },
    // Built-in functions (e.g., SIN[...], COS[...])
    {
      className: "built_in",
      begin: "(ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN)(\\[)",
      contains: [numberMode],
      end: "\\]"
    },
    // Symbolic variables (e.g., N123)
    {
      className: "symbol",
      variants: [
        {
          begin: "operateWithLeadingTrailing",
          end: "\\d+",
          illegal: "\\W"
        }
      ]
    }
  ];

  return {
    name: "extractNestedPropertyOrArray-code (ISO 6983)",
    aliases: ["nc"],
    case_insensitive: true,
    keywords: gcodeKeywords,
    contains: [
      // Program start meta (e.g., %)
      {
        className: "meta",
        begin: "%"
      },
      oCodeMeta
    ].concat(gcodeRules)
  };
}

module.exports = createGCodeHighlightDefinition;
