/**
 * Defines syntax highlighting rules for the Kotlin programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing regexes and common modes.
 * @returns {object} The language definition object for Kotlin highlighting.
 */
function defineKotlinHighlighting(hljs) {
  // Define Kotlin keywords, built-in types, and literals
  const kotlinKeywords = {
    keyword:
      "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
    built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
    literal: "true false null"
  };

  // Matches control flow keywords and allows for annotation symbols after
  const controlFlowKeyword = {
    className: "keyword",
    begin: /\b(break|continue|return|this)\b/,
    starts: {
      contains: [
        {
          className: "symbol",
          begin: /@\w+/
        }
      ]
    }
  };

  // Matches symbol references with trailing @ (e.g., identifier@)
  const symbolReference = {
    className: "symbol",
    begin: hljs.UNDERSCORE_IDENT_RE + "@"
  };

  // Matches string interpolation: ${...}
  const stringSubstitution = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    contains: [hljs.C_NUMBER_MODE]
  };

  // Matches variable interpolation: $variable
  const stringVariable = {
    className: "variable",
    begin: "\\$" + hljs.UNDERSCORE_IDENT_RE
  };

  // Matches Kotlin string literals (triple-quoted, single, double)
  const stringLiteral = {
    className: "string",
    variants: [
      {
        begin: '"""',
        end: '"""(?=[^"] )',
        contains: [stringVariable, stringSubstitution]
      },
      {
        begin: "'",
        end: "'",
        illegal: /\n/,
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '"',
        end: '"',
        illegal: /\n/,
        contains: [hljs.BACKSLASH_ESCAPE, stringVariable, stringSubstitution]
      }
    ]
  };

  // Allow string interpolation inside string substitution
  stringSubstitution.contains.push(stringLiteral);

  // Matches Kotlin meta-annotations (e.g., @file: ...)
  const metaAnnotation = {
    className: "meta",
    begin:
      "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" +
      hljs.UNDERSCORE_IDENT_RE +
      ")?"
  };

  // Matches general annotations (e.g., @Annotation)
  const annotation = {
    className: "meta",
    begin: "@" + hljs.UNDERSCORE_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          hljs.inherit(stringLiteral, {
            className: "meta-string"
          })
        ]
      }
    ]
  };

  // Placeholder for additional Kotlin-specific constructs (external dependency)
  const additionalKotlinConstructs = _c9;

  // Matches block comments (/* ... */), including nested block comments
  const blockComment = hljs.COMMENT("/\*", "\\*/", {
    contains: [hljs.C_BLOCK_COMMENT_MODE]
  });

  // Matches Kotlin type parameters and nested parentheses
  const typeParameter = {
    variants: [
      {
        className: "type",
        begin: hljs.UNDERSCORE_IDENT_RE
      },
      {
        begin: /\(/,
        end: /\)/,
        contains: [] // Will be set recursively below
      }
    ]
  };

  // Recursively allow nested parentheses in type parameters
  typeParameter.variants[1].contains = [typeParameter];

  // Kotlin language definition object
  return {
    name: "Kotlin",
    aliases: ["kt", "kts"],
    keywords: kotlinKeywords,
    contains: [
      // Documentation comments (/** ... */) with doctags
      hljs.COMMENT("/\*\\*", "\\*/", {
        relevance: 0,
        contains: [
          {
            className: "doctag",
            begin: "@[a-z]+"
          }
        ]
      }),
      hljs.C_LINE_COMMENT_MODE,
      blockComment,
      controlFlowKeyword,
      symbolReference,
      metaAnnotation,
      annotation,
      {
        // Function definitions
        className: "function",
        beginKeywords: "fun",
        end: "[(]|$",
        returnBegin: true,
        excludeEnd: true,
        keywords: kotlinKeywords,
        relevance: 5,
        contains: [
          {
            // Function name
            begin: hljs.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            // Type parameters (e.g., <BugReportForm : Any>)
            className: "type",
            begin: /</,
            end: />/,
            keywords: "reified",
            relevance: 0
          },
          {
            // Function parameters
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: kotlinKeywords,
            relevance: 0,
            contains: [
              {
                // Parameter type annotations
                begin: /:/,
                end: /[=,\/]/,
                endsWithParent: true,
                contains: [typeParameter, hljs.C_LINE_COMMENT_MODE, blockComment],
                relevance: 0
              },
              hljs.C_LINE_COMMENT_MODE,
              blockComment,
              metaAnnotation,
              annotation,
              stringLiteral,
              hljs.C_NUMBER_MODE
            ]
          },
          blockComment
        ]
      },
      {
        // Class, interface, trait definitions
        className: "class",
        beginKeywords: "class interface trait",
        end: /[:\{(]|$/,
        excludeEnd: true,
        illegal: "extends implements",
        contains: [
          {
            beginKeywords: "public protected internal private constructor"
          },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            // Type parameters
            className: "type",
            begin: /</,
            end: />/,
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          },
          {
            // Inheritance and interfaces
            className: "type",
            begin: /[,:]\s*/,
            end: /[<\(,]|$/,
            excludeBegin: true,
            returnEnd: true
          },
          metaAnnotation,
          annotation
        ]
      },
      stringLiteral,
      {
        // Shebang line for scripts
        className: "meta",
        begin: "^#!/usr/bin/env",
        end: "$",
        illegal: "\n"
      },
      additionalKotlinConstructs
    ]
  };
}

module.exports = defineKotlinHighlighting;