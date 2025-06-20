/**
 * Returns the syntax highlighting definition for the Rust programming language.
 *
 * This function defines Rust'createInteractionAccessor keywords, built-in types, literals, and syntax patterns
 * for use in a syntax highlighter (such as highlight.js). It configures how comments,
 * strings, numbers, functions, classes, meta attributes, and other Rust constructs
 * are recognized and highlighted.
 *
 * @param {object} languageHelpers - An object providing regular expressions and helper modes for syntax highlighting.
 *   Expected to contain:
 *     - IDENT_RE: Regex string for valid identifiers
 *     - C_LINE_COMMENT_MODE: Mode for line comments
 *     - COMMENT: Function to define comment modes
 *     - QUOTE_STRING_MODE: Mode for quoted strings
 *     - UNDERSCORE_TITLE_MODE: Mode for identifiers with underscores
 *     - inherit: Function to inherit and extend modes
 * @returns {object} The Rust language definition object for syntax highlighting.
 */
function getRustHighlightingDefinition(languageHelpers) {
  // List of Rust reserved keywords
  const rustKeywords =
    "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield";

  // List of Rust built-in types, macros, and common identifiers
  const rustBuiltIns =
    "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";

  return {
    name: "Rust",
    aliases: ["rs"],
    keywords: {
      // Allow optional trailing '!' for macro invocations
      $pattern: languageHelpers.IDENT_RE + "!?",
      keyword: rustKeywords,
      literal: "true false Some None processHiddenModeChild Err",
      built_in: rustBuiltIns
    },
    illegal: "</", // Prevents highlighting HTML-like tags
    contains: [
      // Single-line comments (// ...)
      languageHelpers.C_LINE_COMMENT_MODE,
      // Block comments (/* ... */), allowing nested 'self' references
      languageHelpers.COMMENT("/\*", "\\*/", {
        contains: ["self"]
      }),
      // Standard and byte string literals
      languageHelpers.inherit(languageHelpers.QUOTE_STRING_MODE, {
        begin: /b?"/,
        illegal: null
      }),
      // Raw strings and character literals
      {
        className: "string",
        variants: [
          {
            // Raw string: r##"..."##
            begin: /r(#*)"(.|\n)*?"\1(?!#)/
          },
          {
            // Byte or Unicode character literal: b?'...'
            begin: /b?'\\?(x\w{2}|u\w{4}|UL\w{8}|.)'/
          }
        ]
      },
      // Lifetime or symbol: 'identifier
      {
        className: "symbol",
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
      },
      // Numeric literals (binary, octal, hex, decimal, with optional type suffix)
      {
        className: "number",
        variants: [
          {
            begin: "\\b0b([01_]+)([ui](8|16|32|64|128|size)|f(32|64))?"
          },
          {
            begin: "\\b0o([0-7_]+)([ui](8|16|32|64|128|size)|f(32|64))?"
          },
          {
            begin: "\\b0x([a-f0-9_]+)([ui](8|16|32|64|128|size)|f(32|64))?"
          },
          {
            begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)([ui](8|16|32|64|128|size)|f(32|64))?"
          }
        ],
        relevance: 0
      },
      // Function definitions: fn name(... or fn name<...
      {
        className: "function",
        beginKeywords: "fn",
        end: "(\\(|<)",
        excludeEnd: true,
        contains: [languageHelpers.UNDERSCORE_TITLE_MODE]
      },
      // Meta attributes: #[...] or #![...]
      {
        className: "meta",
        begin: "#!?\\[",
        end: "\\]",
        contains: [
          {
            className: "meta-string",
            begin: /"/,
            end: /"/
          }
        ]
      },
      // Type alias definitions: type Name;
      {
        className: "class",
        beginKeywords: "type",
        end: ";",
        contains: [
          languageHelpers.inherit(languageHelpers.UNDERSCORE_TITLE_MODE, {
            endsParent: true
          })
        ],
        illegal: "\\s"
      },
      // Trait, enum, struct, union definitions: trait Name { ... }
      {
        className: "class",
        beginKeywords: "trait enum struct union",
        end: /\{/, // End at opening brace
        contains: [
          languageHelpers.inherit(languageHelpers.UNDERSCORE_TITLE_MODE, {
            endsParent: true
          })
        ],
        illegal: "[\\w\\d]"
      },
      // Built-in type paths: Identifier::
      {
        begin: languageHelpers.IDENT_RE + "::",
        keywords: {
          built_in: rustBuiltIns
        }
      },
      // Arrow operator (used in function signatures)
      {
        begin: "->"
      }
    ]
  };
}

module.exports = getRustHighlightingDefinition;