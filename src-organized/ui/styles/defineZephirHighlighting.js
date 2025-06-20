/**
 * Defines the syntax highlighting configuration for the Zephir programming language.
 *
 * @param {object} hljs - The highlight.js language definition object, providing utility modes and helpers.
 * @returns {object} The Zephir language definition object for highlight.js.
 */
function defineZephirHighlighting(hljs) {
  // String mode configuration, supporting both single and double quoted strings
  const zephirStringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null })
    ]
  };

  // Identifier mode for underscores and title case (e.g., class names)
  const underscoreTitleMode = hljs.UNDERSCORE_TITLE_MODE;

  // Number mode configuration, supporting binary and C-style numbers
  const zephirNumberMode = {
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
      // Multi-line comments with support for doctags (e.g., @param)
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
      // Static and object member access (e.g., ::method, ->property)
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
              zephirNumberMode
            ]
          }
        ]
      },
      // Class and interface definitions
      {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/, // End at opening brace
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
        illegal: /[.']/, // Disallow dot and single quote
        contains: [underscoreTitleMode]
      },
      // Use statements (imports)
      {
        beginKeywords: "use",
        end: /;/,
        contains: [underscoreTitleMode]
      },
      // Arrow function syntax
      {
        begin: /=>/
      },
      // String and number modes
      zephirStringMode,
      zephirNumberMode
    ]
  };
}

module.exports = defineZephirHighlighting;
