/**
 * Defines the syntax highlighting configuration for the VBScript language.
 *
 * @param {object} hljs - The highlight.js core object, providing utilities and language modes.
 * @returns {object} The language definition object for VBScript, including keywords, built-ins, and syntax rules.
 */
function defineVBScriptLanguage(hljs) {
  // List of built-in VBScript functions
  const vbscriptBuiltInFunctions = "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid split  cint sin datepart ltrim sqr time derived eval date formatpercent exp inputbox left ascw chrw regexp cstr err".split(" ");

  // List of built-in VBScript objects
  const vbscriptBuiltInObjects = [
    "server",
    "response",
    "request",
    "scriptengine",
    "scriptenginebuildversion",
    "scriptengineminorversion",
    "scriptenginemajorversion"
  ];

  // Define a regex pattern for built-in functions followed by an opening parenthesis
  const builtInFunctionPattern = {
    begin: transformAndConcatenate(
      createRegexGroupFromPatterns(...vbscriptBuiltInFunctions),
      "\\s*\\("
    ),
    relevance: 0,
    keywords: {
      built_in: vbscriptBuiltInFunctions
    }
  };

  return {
    name: "VBScript",
    aliases: ["vbs"],
    case_insensitive: true,
    keywords: {
      keyword:
        "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
      built_in: vbscriptBuiltInObjects,
      literal: "true false null nothing empty"
    },
    illegal: "//",
    contains: [
      builtInFunctionPattern,
      // String mode with support for double double-quotes
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        contains: [
          {
            begin: '""'
          }
        ]
      }),
      // Single-line comment mode (starts with apostrophe)
      hljs.COMMENT(/'/, /$/, {
        relevance: 0
      }),
      // Number mode
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = defineVBScriptLanguage;