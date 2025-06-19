/**
 * Defines syntax highlighting rules for the C language (and C-like languages).
 *
 * @param {object} hljs - The highlight.js API object providing utilities and modes.
 * @returns {object} Highlight.js language definition for C.
 */
function defineCHighlightLanguage(hljs) {
  // Single-line comment mode for C(// ...)
  const singleLineCommentMode = hljs.COMMENT("//", "$", {
    contains: [{ begin: /\\\n/ }]
  });

  // Regex for C++ type specifiers and templates
  const decltypeAuto = "decltype\\(auto\\)";
  const namespacePattern = "[a-zA-Z_]\\w*::";
  const templatePattern = "<[^<>]+>";
  // Full type pattern: decltype(auto) or namespaced type with optional template
  const typePattern = `(${decltypeAuto}|${R51(namespacePattern)}[a-zA-Z_]\\w*${R51(templatePattern)})`;

  // Matches C standard typedefs (e.g., uint32_t)
  const typedefKeywordMode = {
    className: "keyword",
    begin: "\\b[a-z\\d_]*_t\\b"
  };

  // Regex for C/C++ escape sequences
  const escapeSequencePattern = "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\s)";

  // String literal modes (normal, char, raw)
  const stringLiteralMode = {
    className: "string",
    variants: [
      {
        begin: '(u8?|UL|createRefCountedMulticastOperator)?"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: `(u8?|UL|createRefCountedMulticastOperator)?'(?:${escapeSequencePattern}|.)`,
        end: "'",
        illegal: "."
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|UL|createRefCountedMulticastOperator)?isWildcardOrX"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  };

  // Number literal modes (binary, decimal, hex, floats)
  const numberLiteralMode = {
    className: "number",
    variants: [
      { begin: "\\b(0b[01']+)" },
      {
        begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|invokeHandlerWithArguments|createRefCountedMulticastOperator)(u|UL)?|(u|UL)(ll|LL|invokeHandlerWithArguments|createRefCountedMulticastOperator)?|f|F|b|createPropertyAccessor)"
      },
      {
        begin: "(-?)(\\b0[xX][a-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
      }
    ],
    relevance: 0
  };

  // Preprocessor directive mode (e.g., #include, #define)
  const preprocessorMode = {
    className: "meta",
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: {
      "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
    },
    contains: [
      { begin: /\\\n/, relevance: 0 },
      hljs.inherit(stringLiteralMode, { className: "meta-string" }),
      { className: "meta-string", begin: /<.*?>/ },
      singleLineCommentMode,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  // Title mode for function/class names with namespaces
  const namespacedTitleMode = {
    className: "title",
    begin: R51(namespacePattern) + hljs.IDENT_RE,
    relevance: 0
  };

  // Pattern for function calls with namespaces
  const namespacedFunctionCallPattern = R51(namespacePattern) + hljs.IDENT_RE + "\\s*\\(";

  // C/C++ keywords, built-ins, and literals
  const cKeywords = {
    keyword:
      "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
    built_in:
      "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
    literal: "true false nullptr NULL"
  };

  // Common modes used in many contexts
  const commonModes = [
    preprocessorMode,
    typedefKeywordMode,
    singleLineCommentMode,
    hljs.C_BLOCK_COMMENT_MODE,
    numberLiteralMode,
    stringLiteralMode
  ];

  // Expression/statement mode for C
  const expressionStatementMode = {
    variants: [
      { begin: /=/, end: /;/ },
      { begin: /\(/, end: /\)/ },
      { beginKeywords: "new throw return else", end: /;/ }
    ],
    keywords: cKeywords,
    contains: commonModes.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: cKeywords,
        contains: commonModes.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  };

  // Function definition mode
  const functionDefinitionMode = {
    className: "function",
    begin: `(${typePattern}[\\*&\\s]+)+${namespacedFunctionCallPattern}`,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: cKeywords,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        begin: decltypeAuto,
        keywords: cKeywords,
        relevance: 0
      },
      {
        begin: namespacedFunctionCallPattern,
        returnBegin: true,
        contains: [namespacedTitleMode],
        relevance: 0
      },
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: cKeywords,
        relevance: 0,
        contains: [
          singleLineCommentMode,
          hljs.C_BLOCK_COMMENT_MODE,
          stringLiteralMode,
          numberLiteralMode,
          typedefKeywordMode,
          {
            begin: /\(/,
            end: /\)/,
            keywords: cKeywords,
            relevance: 0,
            contains: [
              "self",
              singleLineCommentMode,
              hljs.C_BLOCK_COMMENT_MODE,
              stringLiteralMode,
              numberLiteralMode,
              typedefKeywordMode
            ]
          }
        ]
      },
      typedefKeywordMode,
      singleLineCommentMode,
      hljs.C_BLOCK_COMMENT_MODE,
      preprocessorMode
    ]
  };

  return {
    name: "C",
    aliases: ["h"],
    keywords: cKeywords,
    disableAutodetect: true,
    illegal: "</",
    contains: [].concat(
      expressionStatementMode,
      functionDefinitionMode,
      commonModes,
      [
        preprocessorMode,
        {
          // STL containers with template arguments
          begin:
            "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
          end: ">",
          keywords: cKeywords,
          contains: ["self", typedefKeywordMode]
        },
        {
          // Namespaced identifiers
          begin: hljs.IDENT_RE + "::",
          keywords: cKeywords
        },
        {
          className: "class",
          beginKeywords: "enum class struct union",
          end: /[{;:<>=]/,
          contains: [
            { beginKeywords: "final class struct" },
            hljs.TITLE_MODE
          ]
        }
      ]
    ),
    exports: {
      preprocessor: preprocessorMode,
      strings: stringLiteralMode,
      keywords: cKeywords
    }
  };
}

module.exports = defineCHighlightLanguage;