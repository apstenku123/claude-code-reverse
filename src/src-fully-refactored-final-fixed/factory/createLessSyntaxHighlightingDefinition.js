/**
 * Creates a Less syntax highlighting definition for use in syntax highlighters (e.g., highlight.js).
 * This function defines the rules, keywords, and patterns for recognizing Less syntax, including variables,
 * mixins, selectors, at-rules, comments, and more. It leverages CSS highlighting modes and extends them
 * with Less-specific constructs.
 *
 * @param {object} hljs - The highlight.js instance or a compatible object providing common modes and helpers.
 * @returns {object} The Less syntax highlighting definition object.
 */
function createLessSyntaxHighlightingDefinition(hljs) {
  // Import CSS highlighting modes (e.g., hex color, attribute selectors, !important)
  const cssHighlightModes = createCssHighlightModes(hljs);

  // List of Less built-in functions and keywords
  const lessBuiltInFunctions = uc9;

  // Keywords for at-rules
  const atRuleKeywords = "and or not only";

  // Regex for matching CSS/LESS identifiers
  const identifierPattern = "[\\w-]+";

  // Regex for matching variable or interpolated variable
  const variableOrInterpolatedPattern = "([\\w-]+|@\\{[\\w-]+\\})";

  // Top-level container for all Less syntax rules
  const lessTopLevelContains = [];

  // Container for value expressions (e.g., inside property values, mixins, etc.)
  const lessValueContains = [];

  /**
   * Helper to create a string mode for quoted strings (single or double quotes)
   * @param {string} quoteChar - The quote character (either ' or ")
   * @returns {object} The string mode definition
   */
  const createStringMode = (quoteChar) => ({
    className: "string",
    begin: `~?${quoteChar}.*?${quoteChar}`
  });

  /**
   * Helper to create a generic mode
   * @param {string} className - The class name for the mode
   * @param {string|RegExp} begin - The begin pattern
   * @param {number} [relevance] - Optional relevance score
   * @returns {object} The mode definition
   */
  const createMode = (className, begin, relevance = 0) => ({
    className,
    begin,
    relevance
  });

  // Keywords and attributes for at-rules
  const atRuleKeywordsAndAttributes = {
    $pattern: /[a-z-]+/,
    keyword: atRuleKeywords,
    attribute: mc9.join(" ")
  };

  // Mode for parenthesized expressions (e.g., media queries)
  const parenthesizedExpressionMode = {
    begin: "\\(",
    end: "\\)",
    contains: lessValueContains,
    keywords: atRuleKeywordsAndAttributes,
    relevance: 0
  };

  // Populate value container with common Less/CSS constructs
  lessValueContains.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    createStringMode("'"),
    createStringMode('"'),
    hljs.CSS_NUMBER_MODE,
    {
      // url() and data-uri() functions
      begin: "(url|data-uri)\\(",
      starts: {
        className: "string",
        end: "[\\)\\n]",
        excludeEnd: true
      }
    },
    cssHighlightModes.HEXCOLOR,
    parenthesizedExpressionMode,
    createMode("variable", "@@?[\\w-]+", 10),
    createMode("variable", "@\\{[\\w-]+\\}"),
    createMode("built_in", "~?`[^`]*?`"),
    {
      // Property name (attribute) before colon
      className: "attribute",
      begin: "[\\w-]+\\s*:",
      end: ":",
      returnBegin: true,
      excludeEnd: true
    },
    cssHighlightModes.IMPORTANT
  );

  // Value container with block scope (for nested rules)
  const valueWithBlockScope = lessValueContains.concat({
    begin: /\{/,
    end: /\}/,
    contains: lessTopLevelContains
  });

  // Mode for Less 'when' guards (conditional blocks)
  const whenGuardMode = {
    beginKeywords: "when",
    endsWithParent: true,
    contains: [
      { beginKeywords: "and not" },
      ...lessValueContains
    ]
  };

  // Mode for property declarations
  const propertyDeclarationMode = {
    begin: `${variableOrInterpolatedPattern}\s*:`,
    returnBegin: true,
    end: /[;}]/,
    relevance: 0,
    contains: [
      { begin: /-(webkit|moz|ms|processSubLanguageHighlighting)-/ },
      {
        className: "attribute",
        begin: `\b(${dc9.join("|")})\b`,
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

  // Mode for Less/CSS at-rules
  const atRuleMode = {
    className: "keyword",
    begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
    starts: {
      end: "[;{}]",
      keywords: atRuleKeywordsAndAttributes,
      returnEnd: true,
      contains: lessValueContains,
      relevance: 0
    }
  };

  // Mode for Less variables (declarations and usage)
  const variableMode = {
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
      contains: valueWithBlockScope
    }
  };

  // Mode for selectors and mixins
  const selectorOrMixinMode = {
    variants: [
      {
        begin: "[\\.#:&\\[>]",
        end: "[;{}]"
      },
      {
        begin: variableOrInterpolatedPattern,
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
      createMode("keyword", "all\\b"),
      createMode("variable", "@\\{[\\w-]+\\}"),
      {
        begin: `\b(${hc9.join("|")})\b`,
        className: "selector-tag"
      },
      createMode("selector-tag", `${variableOrInterpolatedPattern}%?`, 0),
      createMode("selector-id", `#${variableOrInterpolatedPattern}`),
      createMode("selector-class", `\.${variableOrInterpolatedPattern}`, 0),
      createMode("selector-tag", "&", 0),
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
        contains: valueWithBlockScope
      },
      {
        begin: "!important"
      }
    ]
  };

  // Mode for pseudo selectors with built-in Less functions
  const pseudoSelectorWithBuiltInMode = {
    begin: `[\\w-]+:(:)?(${lessBuiltInFunctions.join("|")})`,
    returnBegin: true,
    contains: [selectorOrMixinMode]
  };

  // Populate top-level Less rules
  lessTopLevelContains.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    atRuleMode,
    variableMode,
    pseudoSelectorWithBuiltInMode,
    propertyDeclarationMode,
    selectorOrMixinMode
  );

  // Return the Less language definition
  return {
    name: "Less",
    case_insensitive: true,
    illegal: `[=>'/<($"]`,
    contains: lessTopLevelContains
  };
}

module.exports = createLessSyntaxHighlightingDefinition;