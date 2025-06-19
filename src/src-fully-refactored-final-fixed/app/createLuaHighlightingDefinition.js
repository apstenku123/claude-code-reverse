/**
 * Generates a syntax highlighting definition object for the Lua programming language.
 * This function is intended for use with syntax highlighters such as highlight.js.
 * It defines Lua keywords, built-ins, literals, comment patterns, function definitions, and string patterns.
 *
 * @param {object} syntaxUtils - An object providing utility methods and regex patterns for syntax highlighting.
 *   Expected to include:
 *     - COMMENT: Function to define comment patterns
 *     - inherit: Function to inherit and extend mode definitions
 *     - TITLE_MODE: Mode for function/variable names
 *     - C_NUMBER_MODE: Mode for number literals
 *     - APOS_STRING_MODE: Mode for single-quoted strings
 *     - QUOTE_STRING_MODE: Mode for double-quoted strings
 *     - UNDERSCORE_IDENT_RE: Regex for valid identifiers
 * @returns {object} Highlight.js-compatible language definition for Lua
 */
function createLuaHighlightingDefinition(syntaxUtils) {
  // Pattern for Lua'createInteractionAccessor long bracketed strings/comments
  const longBracketMode = {
    begin: "\\[=*\\[",
    end: "\\]=*\\]",
    contains: ["self"]
  };

  // Comment patterns: single-line and long-form
  const commentModes = [
    // Single-line comment (not followed by long bracket)
    syntaxUtils.COMMENT("--(?!\\[=*\\[)", "$"),
    // Long-form comment
    syntaxUtils.COMMENT("--\\[=*\\[", "\\]=*\\]", {
      contains: [longBracketMode],
      relevance: 10
    })
  ];

  return {
    name: "Lua",
    keywords: {
      $pattern: syntaxUtils.UNDERSCORE_IDENT_RE,
      literal: "true false nil",
      keyword:
        "and break do else elseif end for goto if in local not or repeat return then until while",
      built_in:
        "CustomError _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp getEndIndexOfInteractionEntry cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
    },
    contains: commentModes.concat([
      {
        className: "function",
        beginKeywords: "function",
        end: "\\)",
        contains: [
          // Function name (possibly namespaced or with method syntax)
          syntaxUtils.inherit(syntaxUtils.TITLE_MODE, {
            begin: "([_a-zA-zA]\\w*\\.)*([_a-zA-zA]\\w*:)?[_a-zA-zA]\\w*"
          }),
          {
            className: "params",
            begin: "\\(",
            endsWithParent: true,
            contains: commentModes
          }
        ].concat(commentModes)
      },
      syntaxUtils.C_NUMBER_MODE,
      syntaxUtils.APOS_STRING_MODE,
      syntaxUtils.QUOTE_STRING_MODE,
      {
        className: "string",
        begin: "\\[=*\\[",
        end: "\\]=*\\]",
        contains: [longBracketMode],
        relevance: 5
      }
    ])
  };
}

module.exports = createLuaHighlightingDefinition;
