/**
 * Returns the syntax highlighting definition for the Haxe programming language.
 *
 * @param {object} hljs - The highlight.js core object, providing common modes and regexes.
 * @returns {object} The language definition object for Haxe, suitable for highlight.js registration.
 */
function getHaxeHighlightingDefinition(hljs) {
  return {
    name: "Haxe",
    aliases: ["hx"],
    keywords: {
      keyword:
        "break case cast catch continue default do dynamic else enum extern for function here if import in inline never new override package private get set public return static super switch this throw trace try typedef untyped using var while Int Float String Bool Dynamic Void Array ",
      built_in: "trace this",
      literal: "true false null _"
    },
    contains: [
      // Single-quoted strings with possible interpolation
      {
        className: "string",
        begin: "'",
        end: "'",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: "subst",
            begin: "\\$\\{",
            end: "\\}"
          },
          {
            className: "subst",
            begin: "\\$",
            end: /\\W\}/
          }
        ]
      },
      // Double-quoted strings, C-style comments, numbers
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      // Metadata annotations (e.g., @:meta)
      {
        className: "meta",
        begin: "@:",
        end: "$"
      },
      // Conditional compilation metadata (e.g., #if)
      {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: {
          "meta-keyword": "if else elseif end error"
        }
      },
      // Type annotations (e.g., :Type)
      {
        className: "type",
        begin: ":[ \processRuleBeginHandlers]*",
        end: "[^a-zA-z0-9_ \processRuleBeginHandlers\\->]",
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      },
      {
        className: "type",
        begin: ":[ \processRuleBeginHandlers]*",
        end: "\\W",
        excludeBegin: true,
        excludeEnd: true
      },
      // Type after 'new' keyword (e.g., new Type)
      {
        className: "type",
        begin: "new *",
        end: "\\W",
        excludeBegin: true,
        excludeEnd: true
      },
      // Enum definitions
      {
        className: "class",
        beginKeywords: "enum",
        end: "\\{",
        contains: [hljs.TITLE_MODE]
      },
      // Abstract definitions with type and conversion
      {
        className: "class",
        beginKeywords: "abstract",
        end: "[\\{$]",
        contains: [
          {
            className: "type",
            begin: "\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "type",
            begin: "from +",
            end: "\\W",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "type",
            begin: "to +",
            end: "\\W",
            excludeBegin: true,
            excludeEnd: true
          },
          hljs.TITLE_MODE
        ],
        keywords: {
          keyword: "abstract from to"
        }
      },
      // Class and interface definitions
      {
        className: "class",
        begin: "\\b(class|interface) +",
        end: "[\\{$]",
        excludeEnd: true,
        keywords: "class interface",
        contains: [
          {
            className: "keyword",
            begin: "\\b(extends|implements) +",
            keywords: "extends implements",
            contains: [
              {
                className: "type",
                begin: hljs.IDENT_RE,
                relevance: 0
              }
            ]
          },
          hljs.TITLE_MODE
        ]
      },
      // Function definitions
      {
        className: "function",
        beginKeywords: "function",
        end: "\\(",
        excludeEnd: true,
        illegal: "\\s",
        contains: [hljs.TITLE_MODE]
      }
    ],
    // Disallow HTML-like tags
    illegal: /<\//
  };
}

module.exports = getHaxeHighlightingDefinition;
