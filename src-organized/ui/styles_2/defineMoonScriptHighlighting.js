/**
 * Defines syntax highlighting rules for the MoonScript language for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing utilities and regexes.
 * @returns {object} Highlight.js language definition object for MoonScript.
 */
function defineMoonScriptHighlighting(hljs) {
  // Define MoonScript keywords, literals, and built-in functions
  const moonScriptKeywords = {
    keyword:
      "if then not for in while do return else elseif break continue switch and or unless when class extends super local import export from using",
    literal: "true false nil",
    built_in:
      "CustomError _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
  };

  // Regular expression for valid MoonScript identifiers
  const identifierRegex = "[a-z$_][0-9A-zA-z$_]*";

  // Substitution interpolation within double-quoted strings: #{ ... }
  const interpolation = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: moonScriptKeywords
  };

  // Number mode with optional trailing slash (for division ambiguity)
  const numberMode = hljs.inherit(hljs.C_NUMBER_MODE, {
    starts: {
      end: "(\\s*/)?",
      relevance: 0
    }
  });

  // String modes: single and double quoted, with escapes and interpolation
  const stringModes = {
    className: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: /"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE, interpolation]
      }
    ]
  };

  // Built-in variable mode: @__identifier
  const builtInVariableMode = {
    className: "built_in",
    begin: "@__" + hljs.IDENT_RE
  };

  // Instance variable mode: @identifier
  const instanceVariableMode = {
    begin: "@" + hljs.IDENT_RE
  };

  // Chained identifier mode: identifier\\identifier
  const chainedIdentifierMode = {
    begin: hljs.IDENT_RE + "\\\\" + hljs.IDENT_RE
  };

  // All basic modes used in MoonScript
  const moonScriptBasicModes = [
    numberMode,
    stringModes,
    builtInVariableMode,
    instanceVariableMode,
    chainedIdentifierMode
  ];

  // Allow interpolation to contain all basic modes
  interpolation.contains = moonScriptBasicModes;

  // Function/class title mode
  const titleMode = hljs.inherit(hljs.TITLE_MODE, {
    begin: identifierRegex
  });

  // Lambda function arrow pattern
  const lambdaArrowPattern = "(\\(.*\\)\\s*)?\\b[-=]>";

  // Function parameter list mode
  const paramsMode = {
    className: "params",
    begin: "\\([^\\(]", // Open parenthesis not followed by another open parenthesis
    returnBegin: true,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: moonScriptKeywords,
        contains: ["self"].concat(moonScriptBasicModes)
      }
    ]
  };

  return {
    name: "MoonScript",
    aliases: ["moon"],
    keywords: moonScriptKeywords,
    illegal: /\/\*/, // Disallow C-style block comments
    contains: moonScriptBasicModes.concat([
      // Single-line comments
      hljs.COMMENT("--", "$"),
      // Function definitions (assignment to lambda)
      {
        className: "function",
        begin: "^\\s*" + identifierRegex + "\\s*=\\s*" + lambdaArrowPattern,
        end: "[-=]>",
        returnBegin: true,
        contains: [titleMode, paramsMode]
      },
      // Inline function definitions (e.g., in argument lists)
      {
        begin: /[\(,:=]\s*/,
        relevance: 0,
        contains: [
          {
            className: "function",
            begin: lambdaArrowPattern,
            end: "[-=]>",
            returnBegin: true,
            contains: [paramsMode]
          }
        ]
      },
      // Class definitions
      {
        className: "class",
        beginKeywords: "class",
        end: "$",
        illegal: /[:="\[\]]/,
        contains: [
          {
            beginKeywords: "extends",
            endsWithParent: true,
            illegal: /[:="\[\]]/,
            contains: [titleMode]
          },
          titleMode
        ]
      },
      // Named fields (e.g., foo: ...)
      {
        className: "name",
        begin: "[a-z$_][0-9A-zA-z$_]*:",
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}

module.exports = defineMoonScriptHighlighting;