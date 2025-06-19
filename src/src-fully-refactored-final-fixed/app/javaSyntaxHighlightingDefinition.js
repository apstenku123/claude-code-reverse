/**
 * Generates a syntax highlighting definition for Java code, suitable for use with a syntax highlighter library.
 *
 * @param {object} highlighterHelpers - An object containing helper modes and regexes for syntax highlighting (e.g., COMMENT, C_LINE_COMMENT_MODE, C_BLOCK_COMMENT_MODE, etc.).
 * @returns {object} The syntax highlighting definition object for Java.
 */
function javaSyntaxHighlightingDefinition(highlighterHelpers) {
  // Java identifier regex: supports Unicode, underscores, and dollar signs
  const JAVA_IDENTIFIER = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*";

  // Java generic type regex: e.g., List<String, Integer>
  const JAVA_GENERIC_TYPE = `${JAVA_IDENTIFIER}(<${JAVA_IDENTIFIER}(\s*,\s*${JAVA_IDENTIFIER})*>)?`;

  // Java reserved keywords
  const JAVA_KEYWORDS =
    "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do";

  // Annotation mode: e.g., @Override, @SuppressWarnings
  const annotationMode = {
    className: "meta",
    begin: `@${JAVA_IDENTIFIER}`,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
      }
    ]
  };

  // External dependency: mode for Java generic types (e.g., List<String>)
  // Assumed to be provided in the context as Hc9
  const javaGenericMode = Hc9;

  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: JAVA_KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      // Javadoc comments
      highlighterHelpers.COMMENT("/\*\\*", "\\*/", {
        relevance: 0,
        contains: [
          {
            begin: /\\w+@/,
            relevance: 0
          },
          {
            className: "doctag",
            begin: "@[a-z]+"
          }
        ]
      }),
      // import java.* statements
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      // Single-line and block comments
      highlighterHelpers.C_LINE_COMMENT_MODE,
      highlighterHelpers.C_BLOCK_COMMENT_MODE,
      // String modes
      highlighterHelpers.APOS_STRING_MODE,
      highlighterHelpers.QUOTE_STRING_MODE,
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
          {
            beginKeywords: "extends implements"
          },
          highlighterHelpers.UNDERSCORE_TITLE_MODE
        ]
      },
      // new, throw, return, else keywords (for relevance)
      {
        beginKeywords: "new throw return else",
        relevance: 0
      },
      // Record declarations (Java 16+)
      {
        className: "class",
        begin: `record\s+${highlighterHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
        returnBegin: true,
        excludeEnd: true,
        end: /[{;=]/,
        keywords: JAVA_KEYWORDS,
        contains: [
          {
            beginKeywords: "record"
          },
          {
            begin: `${highlighterHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
            returnBegin: true,
            relevance: 0,
            contains: [highlighterHelpers.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: JAVA_KEYWORDS,
            relevance: 0,
            contains: [highlighterHelpers.C_BLOCK_COMMENT_MODE]
          },
          highlighterHelpers.C_LINE_COMMENT_MODE,
          highlighterHelpers.C_BLOCK_COMMENT_MODE
        ]
      },
      // Function/method definitions
      {
        className: "function",
        begin: `(${JAVA_GENERIC_TYPE}\s+)+${highlighterHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
        returnBegin: true,
        end: /[{;=]/,
        excludeEnd: true,
        keywords: JAVA_KEYWORDS,
        contains: [
          {
            begin: `${highlighterHelpers.UNDERSCORE_IDENT_RE}\s*\(`,
            returnBegin: true,
            relevance: 0,
            contains: [highlighterHelpers.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: JAVA_KEYWORDS,
            relevance: 0,
            contains: [
              annotationMode,
              highlighterHelpers.APOS_STRING_MODE,
              highlighterHelpers.QUOTE_STRING_MODE,
              javaGenericMode,
              highlighterHelpers.C_BLOCK_COMMENT_MODE
            ]
          },
          highlighterHelpers.C_LINE_COMMENT_MODE,
          highlighterHelpers.C_BLOCK_COMMENT_MODE
        ]
      },
      // Java generic type mode and annotation mode
      javaGenericMode,
      annotationMode
    ]
  };
}

module.exports = javaSyntaxHighlightingDefinition;