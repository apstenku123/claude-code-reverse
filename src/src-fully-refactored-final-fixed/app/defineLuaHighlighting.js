/**
 * Defines syntax highlighting rules for the Lua programming language.
 *
 * @param {object} highlightJsApi - The Highlight.js API object, providing helper methods and regex patterns.
 * @returns {object} Highlight.js language definition object for Lua.
 */
function defineLuaHighlighting(highlightJsApi) {
  // Define the pattern for Lua multiline strings and comments
  const longBracketMode = {
    begin: "\\[=*\\[",
    end: "\\]=*\\]",
    contains: ["self"] // Allows nesting of long brackets
  };

  // Define Lua comment modes: single-line and multiline
  const commentModes = [
    // Single-line comment (does not match multiline)
    highlightJsApi.COMMENT("--(?!\\[=*\\[)", "$"),
    // Multiline comment using long brackets
    highlightJsApi.COMMENT("--\\[=*\\[", "\\]=*\\]", {
      contains: [longBracketMode],
      relevance: 10
    })
  ];

  // Define Lua keywords, literals, and built-in functions
  const luaKeywords = {
    $pattern: highlightJsApi.UNDERSCORE_IDENT_RE,
    literal: "true false nil",
    keyword:
      "and break do else elseif end for goto if in local not or repeat return then until while",
    built_in:
      "CustomError _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp getEndIndexOfInteractionEntry cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
  };

  // Define function mode for Lua
  const functionMode = {
    className: "function",
    beginKeywords: "function",
    end: "\\)",
    contains: [
      // Function name (may include method or table syntax)
      highlightJsApi.inherit(highlightJsApi.TITLE_MODE, {
        begin: "([_a-zA-zA]\\w*\\.)*([_a-zA-zA]\\w*:)?[_a-zA-zA]\\w*"
      }),
      {
        className: "params",
        begin: "\\(",
        endsWithParent: true,
        contains: commentModes // Allow comments inside parameter lists
      },
      // Allow comments directly inside function definitions
      ...commentModes
    ]
  };

  // Define long bracket string mode (for Lua multiline strings)
  const longBracketStringMode = {
    className: "string",
    begin: "\\[=*\\[",
    end: "\\]=*\\]",
    contains: [longBracketMode],
    relevance: 5
  };

  // Compose the final contains array for the Lua language definition
  const luaContains = [
    ...commentModes,
    functionMode,
    highlightJsApi.C_NUMBER_MODE,
    highlightJsApi.APOS_STRING_MODE,
    highlightJsApi.QUOTE_STRING_MODE,
    longBracketStringMode
  ];

  // Return the full language definition object
  return {
    name: "Lua",
    keywords: luaKeywords,
    contains: luaContains
  };
}

module.exports = defineLuaHighlighting;