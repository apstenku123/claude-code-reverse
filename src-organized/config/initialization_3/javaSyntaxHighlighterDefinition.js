/**
 * Generates a syntax highlighting definition object for Java code, suitable for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and regexes.
 * @returns {object} Highlight.js language definition for Java.
 */
function javaSyntaxHighlighterDefinition(hljs) {
  // Java identifier regex: supports unicode, letters, $, _
  const JAVA_IDENTIFIER = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*";

  // Java generic type regex: e.g., List<String, Integer>
  const JAVA_GENERIC_TYPE = `${JAVA_IDENTIFIER}(<${JAVA_IDENTIFIER}(\s*,\s*${JAVA_IDENTIFIER})*>)?`;

  // Java reserved keywords (from Java Language Specification)
  const JAVA_KEYWORDS =
    "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do";

  // Annotation definition: e.g., @Override, @SuppressWarnings(...)
  const ANNOTATION_MODE = {
    className: "meta",
    begin: `@${JAVA_IDENTIFIER}`,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"] // Allow nested parentheses in annotation parameters
      }
    ]
  };

  // Custom mode, possibly for highlighting numbers, annotations, etc.
  // This is an external dependency, assumed to be provided in the context
  const JAVA_NUMBER_MODE = Hc9;

  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: JAVA_KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      // Javadoc comments
      hljs.COMMENT("/\*\\*", "\\*/", {
        relevance: 0,
        contains: [
          {
            begin: /\\w+@/, // e.g., param@, return@
            relevance: 0
          },
          {
            className: "doctag",
            begin: "@[a-z]+" // e.g., @param, @return
          }
        ]
      }),
      // Import statements for java.* packages
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      // Single-line and multi-line comments
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // String modes
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      // Class, interface, enum definitions
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
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // Keywords that can appear as statements
      {
        beginKeywords: "new throw return else",
        relevance: 0
      },
      // Java record definitions (Java 14+)
      {
        className: "class",
        begin: `record\s+${hljs.UNDERSCORE_IDENT_RE}\s*\(`,
        returnBegin: true,
        excludeEnd: true,
        end: /[{;=]/,
        keywords: JAVA_KEYWORDS,
        contains: [
          { beginKeywords: "record" },
          {
            begin: `${hljs.UNDERSCORE_IDENT_RE}\s*\(`,
            returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: JAVA_KEYWORDS,
            relevance: 0,
            contains: [hljs.C_BLOCK_COMMENT_MODE]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      // Function/method definitions
      {
        className: "function",
        // Match return type(createInteractionAccessor) and method name, e.g., public static <BugReportForm> void foo(...)
        begin: `(${JAVA_GENERIC_TYPE}\s+)+${hljs.UNDERSCORE_IDENT_RE}\s*\(`,
        returnBegin: true,
        end: /[{;=]/,
        excludeEnd: true,
        keywords: JAVA_KEYWORDS,
        contains: [
          {
            begin: `${hljs.UNDERSCORE_IDENT_RE}\s*\(`,
            returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: JAVA_KEYWORDS,
            relevance: 0,
            contains: [
              ANNOTATION_MODE,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              JAVA_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      // Number highlighting, annotation highlighting
      JAVA_NUMBER_MODE,
      ANNOTATION_MODE
    ]
  };
}

module.exports = javaSyntaxHighlighterDefinition;