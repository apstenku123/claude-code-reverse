/**
 * Defines syntax highlighting rules for Java source code for a highlighting engine.
 *
 * @param {object} syntaxHelpers - An object containing helper modes and regexes for syntax highlighting (e.g., COMMENT, C_LINE_COMMENT_MODE, etc.).
 * @returns {object} Highlight.js language definition object for Java.
 */
function defineJavaHighlighting(syntaxHelpers) {
  // Java identifier regex: supports Unicode letters, underscores, and dollar signs
  const IDENTIFIER_RE = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*";

  // Java generic type regex: e.g., List<String, Integer>
  const GENERIC_TYPE_RE = `${IDENTIFIER_RE}(<${IDENTIFIER_RE}(\s*,\s*${IDENTIFIER_RE})*>)?`;

  // Java reserved keywords
  const JAVA_KEYWORDS =
    "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do";

  // Annotation highlighting rule (e.g., @Override)
  const annotationRule = {
    className: "meta",
    begin: `@${IDENTIFIER_RE}`,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
      }
    ]
  };

  // Additional highlighting rule, possibly for generics or type parameters
  // (Assumed to be defined elsewhere and imported as 'additionalHighlightingRule')
  const additionalHighlightingRule = Hc9;

  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: JAVA_KEYWORDS,
    illegal: /<\/|#/, // Illegal patterns for Java source
    contains: [
      // Javadoc comments
      syntaxHelpers.COMMENT("/\*\\*", "\\*/", {
        relevance: 0,
        contains: [
          { begin: /\\w+@/, relevance: 0 },
          { className: "doctag", begin: "@[a-z]+" }
        ]
      }),
      // Import statements
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      // Single-line and block comments
      syntaxHelpers.C_LINE_COMMENT_MODE,
      syntaxHelpers.C_BLOCK_COMMENT_MODE,
      // String literals
      syntaxHelpers.APOS_STRING_MODE,
      syntaxHelpers.QUOTE_STRING_MODE,
      // Class, interface, enum declarations
      {
        className: "class",
        beginKeywords: "class interface enum",
        end: /[{;=]/,
        excludeEnd: true,
        relevance: 1,
        keywords: "class interface enum",
        illegal: /[:"\[\]]/,
        contains: [
          { beginKeywords: "extends implements" },
          syntaxHelpers.UNDERSCORE_TITLE_MODE
        ]
      },
      // Control flow keywords
      {
        beginKeywords: "new throw return else",
        relevance: 0
      },
      // Record declarations (Java 16+)
      {
        className: "class",
        begin: `record\s+${syntaxHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
        returnBegin: true,
        excludeEnd: true,
        end: /[{;=]/,
        keywords: JAVA_KEYWORDS,
        contains: [
          { beginKeywords: "record" },
          {
            begin: `${syntaxHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
            returnBegin: true,
            relevance: 0,
            contains: [syntaxHelpers.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: JAVA_KEYWORDS,
            relevance: 0,
            contains: [syntaxHelpers.C_BLOCK_COMMENT_MODE]
          },
          syntaxHelpers.C_LINE_COMMENT_MODE,
          syntaxHelpers.C_BLOCK_COMMENT_MODE
        ]
      },
      // Method/function declarations
      {
        className: "function",
        begin: `(${GENERIC_TYPE_RE}\s+)+${syntaxHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
        returnBegin: true,
        end: /[{;=]/,
        excludeEnd: true,
        keywords: JAVA_KEYWORDS,
        contains: [
          {
            begin: `${syntaxHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
            returnBegin: true,
            relevance: 0,
            contains: [syntaxHelpers.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: JAVA_KEYWORDS,
            relevance: 0,
            contains: [
              annotationRule,
              syntaxHelpers.APOS_STRING_MODE,
              syntaxHelpers.QUOTE_STRING_MODE,
              additionalHighlightingRule,
              syntaxHelpers.C_BLOCK_COMMENT_MODE
            ]
          },
          syntaxHelpers.C_LINE_COMMENT_MODE,
          syntaxHelpers.C_BLOCK_COMMENT_MODE
        ]
      },
      // Additional rules
      additionalHighlightingRule,
      annotationRule
    ]
  };
}

module.exports = defineJavaHighlighting;