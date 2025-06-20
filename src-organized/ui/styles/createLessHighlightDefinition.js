/**
 * Generates a syntax highlighting definition for LESS, suitable for use with highlight.js or similar tools.
 * This function defines the rules, keywords, and patterns for highlighting LESS code, including variables,
 * mixins, selectors, at-rules, and comments. It leverages CSS highlighting modes and extends them with LESS-specific features.
 *
 * @param {object} hljs - The highlight.js instance or a syntax highlighting context, providing common modes and helpers.
 * @returns {object} LESS language definition object for syntax highlighting.
 */
function createLessHighlightDefinition(hljs) {
  // Import CSS highlighting modes and helpers
  const cssHighlightModes = createCssHighlightModes(hljs);

  // LESS-specific keywords
  const LESS_KEYWORDS = "and or not only";

  // Common regex patterns
  const WORD_PATTERN = "[\\w-]+";
  const VARIABLE_PATTERN = "([\\w-]+|@\\{[\\w-]+\\})";

  // Main containers for highlight rules
  const lessContains = [];
  const lessValueContains = [];

  /**
   * Helper to define string modes (single or double quotes, possibly with ~ prefix)
   * @param {string} quoteChar
   * @returns {object}
   */
  function createStringMode(quoteChar) {
    return {
      className: "string",
      begin: `~?${quoteChar}.*?${quoteChar}`
    };
  }

  /**
   * Helper to define a simple mode
   * @param {string} className
   * @param {string|RegExp} begin
   * @param {number} [relevance]
   * @returns {object}
   */
  function createSimpleMode(className, begin, relevance = 0) {
    return {
      className,
      begin,
      relevance
    };
  }

  // LESS keywords and attributes for at-rules
  const lessAtRuleKeywords = {
    $pattern: /[a-z-]+/,
    keyword: LESS_KEYWORDS,
    attribute: mc9.join(" ")
  };

  // Parenthesis mode for media queries and similar constructs
  const parenthesisMode = {
    begin: "\\(",
    end: "\\)",
    contains: lessValueContains,
    keywords: lessAtRuleKeywords,
    relevance: 0
  };

  // Populate value-level contains (expressions inside property values, etc.)
  lessValueContains.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    createStringMode("'"),
    createStringMode('"'),
    hljs.CSS_NUMBER_MODE,
    {
      begin: "(url|data-uri)\\(",
      starts: {
        className: "string",
        end: "[\\)\\n]",
        excludeEnd: true
      }
    },
    cssHighlightModes.HEXCOLOR,
    parenthesisMode,
    createSimpleMode("variable", "@@?[\\w-]+", 10),
    createSimpleMode("variable", "@\\{[\\w-]+\\}"),
    createSimpleMode("built_in", "~?`[^`]*?`"),
    {
      className: "attribute",
      begin: "[\\w-]+\\s*:",
      end: ":",
      returnBegin: true,
      excludeEnd: true
    },
    cssHighlightModes.IMPORTANT
  );

  // Value-level contains, but with block support (for nested rules)
  const valueWithBlockContains = lessValueContains.concat({
    begin: /\{/,
    end: /\}/,
    contains: lessContains
  });

  // 'when' keyword for guards in LESS
  const whenGuardMode = {
    beginKeywords: "when",
    endsWithParent: true,
    contains: [
      { beginKeywords: "and not" },
      ...lessValueContains
    ]
  };

  // Property definition mode (for CSS/LESS properties)
  const propertyDefinitionMode = {
    begin: VARIABLE_PATTERN + "\\s*:",
    returnBegin: true,
    end: /[;}]/,
    relevance: 0,
    contains: [
      { begin: /-(webkit|moz|ms|processSubLanguageHighlighting)-/ },
      {
        className: "attribute",
        begin: `\\b(${dc9.join("|")})\\b`,
        end: /(?=:)/,
        starts: {
          endsWithParent: true,
          illegal: "[<=$]",
          relevance: 0,
          contains: lessValueContains
        }
      }
    ]
  };

  // At-rule mode (e.g., @import, @media, etc.)
  const atRuleMode = {
    className: "keyword",
    begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
    starts: {
      end: "[;{}]",
      keywords: lessAtRuleKeywords,
      returnEnd: true,
      contains: lessValueContains,
      relevance: 0
    }
  };

  // Variable definition mode (e.g., @color: #fff;)
  const variableDefinitionMode = {
    className: "variable",
    variants: [
      {
        begin: "@[\\w-]+\\s*:",
        relevance: 15
      },
      {
        begin: "@[\\w-]+"
      }
    ],
    starts: {
      end: "[;}]",
      returnEnd: true,
      contains: valueWithBlockContains
    }
  };

  // Selector mode (for LESS selectors, mixins, etc.)
  const selectorMode = {
    variants: [
      {
        begin: "[\\.#:&\\[>]",
        end: "[;{}]"
      },
      {
        begin: VARIABLE_PATTERN,
        end: /\{/
      }
    ],
    returnBegin: true,
    returnEnd: true,
    illegal: `[<='$"]`,
    relevance: 0,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      whenGuardMode,
      createSimpleMode("keyword", "all\\b"),
      createSimpleMode("variable", "@\\{[\\w-]+\\}"),
      {
        begin: `\\b(${hc9.join("|")})\\b`,
        className: "selector-tag"
      },
      createSimpleMode("selector-tag", VARIABLE_PATTERN + "%?", 0),
      createSimpleMode("selector-id", "#" + VARIABLE_PATTERN),
      createSimpleMode("selector-class", "\\." + VARIABLE_PATTERN, 0),
      createSimpleMode("selector-tag", "&", 0),
      cssHighlightModes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        begin: `:(${pSA.join("|")})`
      },
      {
        className: "selector-pseudo",
        begin: `::(${cSA.join("|")})`
      },
      {
        begin: "\\(",
        end: "\\)",
        contains: valueWithBlockContains
      },
      {
        begin: "!important"
      }
    ]
  };

  // Pseudo selector with special LESS function support
  const pseudoSelectorWithFunctionMode = {
    begin: `[\\w-]+:(:)?(${uc9.join("|")})`,
    returnBegin: true,
    contains: [selectorMode]
  };

  // Main LESS contains array (top-level rules)
  lessContains.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    atRuleMode,
    variableDefinitionMode,
    pseudoSelectorWithFunctionMode,
    propertyDefinitionMode,
    selectorMode
  );

  // Final LESS language definition
  return {
    name: "Less",
    case_insensitive: true,
    illegal: `[=>'/<($"]`,
    contains: lessContains
  };
}

module.exports = createLessHighlightDefinition;