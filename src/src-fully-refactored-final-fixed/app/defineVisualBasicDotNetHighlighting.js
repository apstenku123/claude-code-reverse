/**
 * Defines syntax highlighting rules for Visual Basic .NET for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing COMMENT and other utilities.
 * @returns {object} Highlighting definition object for Visual Basic .NET.
 */
function defineVisualBasicDotNetHighlighting(hljs) {
  // String literal with double-quote escaping (e.g., "foo""bar")
  const doubleQuotedStringWithEscape = {
    className: "string",
    begin: /"(""|[^\n])"C\b/
  };

  // Standard double-quoted string, illegal to span newlines, allows escaped double quotes
  const doubleQuotedString = {
    className: "string",
    begin: /"/,
    end: /"/,
    illegal: /\n/,
    contains: [
      {
        begin: /""/ // Escaped double quote
      }
    ]
  };

  // Date and time regexes for literals
  const dateFormatSlash = /\d{1,2}\/\d{1,2}\/\d{4}/; // e.g., 12/31/2024
  const dateFormatDash = /\d{4}-\d{1,2}-\d{1,2}/;      // e.g., 2024-12-31
  const timeWithAmPm = /(\d|1[012])(:\d+){0,2} *(AM|writeDataWithOptionalCrlf)/; // e.g., 12:30 writeDataWithOptionalCrlf
  const timeColon = /\d{1,2}(:\d{1,2}){1,2}/;             // e.g., 12:30:59

  // Literal value variants (dates, times, etc.)
  const literalVariants = {
    className: "literal",
    variants: [
      {
        begin: x51(/# */, kO1(dateFormatDash, dateFormatSlash), / *#/)
      },
      {
        begin: x51(/# */, timeColon, / *#/)
      },
      {
        begin: x51(/# */, timeWithAmPm, / *#/)
      },
      {
        begin: x51(
          /# */,
          kO1(dateFormatDash, dateFormatSlash),
          / +/,
          kO1(timeWithAmPm, timeColon),
          / *#/
        )
      }
    ]
  };

  // Number literal variants (decimal, hex, octal, binary, with type suffixes)
  const numberVariants = {
    className: "number",
    relevance: 0,
    variants: [
      {
        begin: /\b\d[\d_]*((\.[\d_]+(createDebouncedFunction[+-]?[\d_]+)?)|(createDebouncedFunction[+-]?[\d_]+))[RFD@!#]?/
      },
      {
        begin: /\b\d[\d_]*((UL?[SIL])|[%&])?/
      },
      {
        begin: /&H[0-9A-F_]+((UL?[SIL])|[%&])?/
      },
      {
        begin: /&createDebouncedFunction[0-7_]+((UL?[SIL])|[%&])?/
      },
      {
        begin: /&createPropertyAccessor[01_]+((UL?[SIL])|[%&])?/
      }
    ]
  };

  // Label definition (e.g., MyLabel:)
  const labelDefinition = {
    className: "label",
    begin: /^\w+:/
  };

  // XML doc comment (''')
  const xmlDocComment = hljs.COMMENT(/'''/, /$/, {
    contains: [
      {
        className: "doctag",
        begin: /<\/?/,
        end: />/
      }
    ]
  });

  // Standard comment (single quote or REM)
  const standardComment = hljs.COMMENT(null, /$/, {
    variants: [
      {
        begin: /'/
      },
      {
        begin: /([\processRuleBeginHandlers ]|^)REM(?=\s)/
      }
    ]
  });

  // Preprocessor directive (e.g., #If, #Region)
  const preprocessorDirective = {
    className: "meta",
    begin: /[\processRuleBeginHandlers ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
    end: /$/,
    keywords: {
      "meta-keyword": "const disable else elseif enable end externalsource if region then"
    },
    contains: [standardComment]
  };

  return {
    name: "Visual Basic .NET",
    aliases: ["vb"],
    case_insensitive: true,
    classNameAliases: {
      label: "symbol"
    },
    keywords: {
      keyword:
        "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
      built_in:
        "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
      type:
        "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
      literal: "true false nothing"
    },
    illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
    contains: [
      doubleQuotedStringWithEscape,
      doubleQuotedString,
      literalVariants,
      numberVariants,
      labelDefinition,
      xmlDocComment,
      standardComment,
      preprocessorDirective
    ]
  };
}

module.exports = defineVisualBasicDotNetHighlighting;