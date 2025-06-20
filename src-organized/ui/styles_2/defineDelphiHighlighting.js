/**
 * Defines syntax highlighting rules for Delphi and related Pascal dialects for a syntax highlighter.
 *
 * @param {object} hljs - The syntax highlighter instance with helper methods and regexes.
 * @returns {object} Highlight.js language definition for Delphi/Pascal.
 */
function defineDelphiHighlighting(hljs) {
  // List of Delphi/Pascal keywords as a space-separated string
  const KEYWORDS =
    "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure absolute reintroduce operator as is abstract alias assembler bitpacked break continue cppdecl cvar enumerator experimental platform deprecated unimplemented dynamic export far16 forward generic helper implements interrupt iochecks local name nodefault noreturn nostackframe oldfpccall otherwise saveregisters softfloat specialize strict unaligned varargs ";

  // Comment modes: // line comments, { ... } block comments, (* ... *) block comments
  const COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(/\{/, /\}/, { relevance: 0 }),
    hljs.COMMENT(/\(\*/, /\*\)/, { relevance: 10 })
  ];

  // Meta directives: {$ ... } and (*$ ... *)
  const META_DIRECTIVE = {
    className: "meta",
    variants: [
      { begin: /\{\$/, end: /\}/ },
      { begin: /\(\*\$/, end: /\*\)/ }
    ]
  };

  // Single-quoted string literal, with doubled single quote as escape
  const SINGLE_QUOTE_STRING = {
    className: "string",
    begin: /'/,
    end: /'/,
    contains: [
      { begin: /''/ } // Escaped single quote
    ]
  };

  // Number literals: hexadecimal ($...), octal (&...), binary (%...)
  const NUMBER_LITERAL = {
    className: "number",
    relevance: 0,
    variants: [
      { begin: "\\$[0-9A-Fa-f]+" }, // Hexadecimal
      { begin: "&[0-7]+" },           // Octal
      { begin: "%[01]+" }            // Binary
    ]
  };

  // Character codes: #13, #10, etc., possibly chained (#13#10)
  const CHAR_CODE_STRING = {
    className: "string",
    begin: /(#\d+)+/
  };

  // Class definition: identifier = class(...)
  const CLASS_DEFINITION = {
    begin: hljs.IDENT_RE + "\\s*=\\s*class\\s*\\(",
    returnBegin: true,
    contains: [hljs.TITLE_MODE]
  };

  // Function/procedure/method definition
  const FUNCTION_DEFINITION = {
    className: "function",
    beginKeywords: "function constructor destructor procedure",
    end: /[:;]/,
    keywords: "function constructor|10 destructor|10 procedure|10",
    contains: [
      hljs.TITLE_MODE,
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [SINGLE_QUOTE_STRING, CHAR_CODE_STRING, META_DIRECTIVE, ...COMMENT_MODES]
      },
      META_DIRECTIVE,
      ...COMMENT_MODES
    ]
  };

  return {
    name: "Delphi",
    aliases: [
      "dpr", "dfm", "pas", "pascal", "freepascal", "lazarus", "lpr", "lfm"
    ],
    case_insensitive: true,
    keywords: KEYWORDS,
    // Illegal patterns: double quote, $extractNestedPropertyOrArray-zA, /*, </, |
    illegal: /"|\$[A-Za-z_][A-Za-z0-9_]*|\/\*|<\/|\|/,
    contains: [
      SINGLE_QUOTE_STRING,
      CHAR_CODE_STRING,
      hljs.NUMBER_MODE,
      NUMBER_LITERAL,
      CLASS_DEFINITION,
      FUNCTION_DEFINITION,
      META_DIRECTIVE,
      ...COMMENT_MODES
    ]
  };
}

module.exports = defineDelphiHighlighting;
