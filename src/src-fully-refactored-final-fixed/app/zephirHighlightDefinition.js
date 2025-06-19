/**
 * Returns the syntax highlighting definition for the Zephir language for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and helpers.
 * @returns {object} Zephir language definition object for highlight.js
 */
function zephirHighlightDefinition(hljs) {
  // String mode: matches single and double quoted strings, allows escapes
  const zephirStringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null })
    ]
  };

  // Identifier mode for underscores and title-case (used in classes, namespaces, etc.)
  const underscoreTitleMode = hljs.UNDERSCORE_TITLE_MODE;

  // Number mode: matches binary and C-style numbers
  const numberMode = {
    variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]
  };

  // Zephir language keywords
  const zephirKeywords =
    "namespace class interface use extends function return abstract final public protected private static deprecated throw try catch Exception echo empty isset instanceof unset let var new const self require if else elseif switch case default do while loop for continue break likely unlikely __LINE__ __FILE__ __DIR__ __FUNCTION__ __CLASS__ __TRAIT__ __METHOD__ __NAMESPACE__ array boolean float double integer object resource string char long unsigned bool int uint ulong uchar true false null undefined";

  return {
    name: "Zephir",
    aliases: ["zep"],
    keywords: zephirKeywords,
    contains: [
      // Single-line comments
      hljs.C_LINE_COMMENT_MODE,
      // Multi-line comments with support for @doctags
      hljs.COMMENT(/\/\*/, /\*\//, {
        contains: [
          {
            className: "doctag",
            begin: /@[a-z]+/
          }
        ]
      }),
      // Heredoc/Nowdoc string syntax
      {
        className: "string",
        begin: /<<<['"]?\w+['"]?$/,
        end: /^\w+;/,
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      // Static and instance member access (:: or ->)
      {
        begin: /(::|->)+[A-Za-z_\x7f-\xff][A-Za-z0-9_\x7f-\xff]*/
      },
      // Function definitions
      {
        className: "function",
        beginKeywords: "function fn",
        end: /[;{]/,
        excludeEnd: true,
        illegal: /\$|\[|%/,
        contains: [
          underscoreTitleMode,
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: zephirKeywords,
            contains: [
              "self",
              hljs.C_BLOCK_COMMENT_MODE,
              zephirStringMode,
              numberMode
            ]
          }
        ]
      },
      // Class and interface definitions
      {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/,
        excludeEnd: true,
        illegal: /[:($"]/,
        contains: [
          { beginKeywords: "extends implements" },
          underscoreTitleMode
        ]
      },
      // Namespace declarations
      {
        beginKeywords: "namespace",
        end: /;/,
        illegal: /[.']/, // Disallow . and '
        contains: [underscoreTitleMode]
      },
      // Use statements
      {
        beginKeywords: "use",
        end: /;/,
        contains: [underscoreTitleMode]
      },
      // Arrow function operator
      {
        begin: /=>/
      },
      // String and number modes
      zephirStringMode,
      numberMode
    ]
  };
}

module.exports = zephirHighlightDefinition;
