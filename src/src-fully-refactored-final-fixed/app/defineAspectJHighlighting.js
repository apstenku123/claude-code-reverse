/**
 * Defines syntax highlighting rules for the AspectJ language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing common modes and regexes.
 * @returns {object} An object describing AspectJ syntax highlighting rules.
 */
function defineAspectJHighlighting(hljs) {
  // List of AspectJ and Java keywords
  const aspectjKeywords = [
    "false", "synchronized", "int", "abstract", "float", "private", "char", "boolean", "static", "null", "if", "const", "for", "true", "while", "long", "throw", "strictfp", "finally", "protected", "import", "native", "final", "return", "void", "enum", "else", "extends", "implements", "break", "transient", "new", "catch", "instanceof", "byte", "super", "volatile", "case", "assert", "short", "package", "default", "double", "public", "try", "this", "switch", "continue", "throws", "privileged", "aspectOf", "adviceexecution", "proceed", "cflowbelow", "cflow", "initialization", "preinitialization", "staticinitialization", "withincode", "target", "within", "execution", "getWithinTypeName", "handler", "thisJoinPoint", "thisJoinPointStaticPart", "thisEnclosingJoinPointStaticPart", "declare", "parents", "warning", "error", "soft", "precedence", "thisAspectInstance"
  ].join(" ");

  // List of special AspectJ function keywords
  const aspectjFunctions = "get set args call";

  return {
    name: "AspectJ",
    keywords: aspectjKeywords,
    illegal: /<\/|#/, // Illegal HTML/XML tags or hash
    contains: [
      // JavaDoc-style comments
      hljs.COMMENT(/\/\*\*/, /\*\//, {
        relevance: 0,
        contains: [
          {
            begin: /\\w+@/, // e.g. param@, return@ (not a real JavaDoc tag)
            relevance: 0
          },
          {
            className: "doctag",
            begin: /@[a-zA-Z]+/ // e.g. @param, @return
          }
        ]
      }),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      // Aspect declaration (aspect ...)
      {
        className: "class",
        beginKeywords: "aspect",
        end: /[{;=]/,
        excludeEnd: true,
        illegal: /[:;"\[\]]/,
        contains: [
          {
            beginKeywords: "extends implements pertypewithin perthis pertarget percflowbelow percflow issingleton"
          },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            // Parameters in aspect declaration
            begin: /\([^\)]*/,
            end: /[)]+/,
            keywords: aspectjKeywords + " " + aspectjFunctions,
            excludeEnd: false
          }
        ]
      },
      // Class or interface declaration
      {
        className: "class",
        beginKeywords: "class interface",
        end: /[{;=]/,
        excludeEnd: true,
        relevance: 0,
        keywords: "class interface",
        illegal: /[:"\[\]]/,
        contains: [
          {
            beginKeywords: "extends implements"
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // Pointcut/advice declaration
      {
        beginKeywords: "pointcut after before around throwing returning",
        end: /[)]/,
        excludeEnd: false,
        illegal: /["\[\]]/,
        contains: [
          {
            // Pointcut name (identifier followed by parenthesis)
            begin: concatenateSourceStrings(hljs.UNDERSCORE_IDENT_RE, /\s*\(/),
            returnBegin: true,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          }
        ]
      },
      // Advice body (colon)
      {
        begin: /[:]/,
        returnBegin: true,
        end: /[{;]/,
        relevance: 0,
        excludeEnd: false,
        keywords: aspectjKeywords,
        illegal: /["\[\]]/,
        contains: [
          {
            begin: concatenateSourceStrings(hljs.UNDERSCORE_IDENT_RE, /\s*\(/),
            keywords: aspectjKeywords + " " + aspectjFunctions,
            relevance: 0
          },
          hljs.QUOTE_STRING_MODE
        ]
      },
      // new/throw statements
      {
        beginKeywords: "new throw",
        relevance: 0
      },
      // Function/method declaration
      {
        className: "function",
        begin: /\\w+ +\w+(\.\w+)?\s*\([^\)]*\)\s*((throws)[\w\s,]+)?[\{;]/,
        returnBegin: true,
        end: /[{;=]/,
        keywords: aspectjKeywords,
        excludeEnd: true,
        contains: [
          {
            // Function name
            begin: concatenateSourceStrings(hljs.UNDERSCORE_IDENT_RE, /\s*\(/),
            returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            // Function parameters
            className: "params",
            begin: /\(/,
            end: /\)/,
            relevance: 0,
            keywords: aspectjKeywords,
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      hljs.C_NUMBER_MODE,
      // Annotations
      {
        className: "meta",
        begin: /@[a-zA-Z]+/
      }
    ]
  };
}

module.exports = defineAspectJHighlighting;
