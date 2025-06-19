/**
 * Factory function to create a highlight.js language definition for AppleScript.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and helpers.
 * @returns {object} Highlight.js language definition for AppleScript.
 */
function createApplescriptHighlightDefinition(hljs) {
  // Inherit the QUOTE_STRING_MODE but allow all content (illegal: null)
  const quoteStringMode = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null
  });

  // Parameter list mode for function definitions (e.g., on myHandler(param1, param2))
  const paramsMode = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    contains: ["self", hljs.C_NUMBER_MODE, quoteStringMode]
  };

  // Single-line comment mode (--) 
  const singleLineCommentMode = hljs.COMMENT(/--/, /$/);

  // Multi-line comment mode ( (* ... *) ), can contain single-line comments
  const multiLineCommentMode = hljs.COMMENT(/\(\*/, /\*\)/, {
    contains: ["self", singleLineCommentMode]
  });

  // All comment modes, including hash comments
  const commentModes = [
    singleLineCommentMode,
    multiLineCommentMode,
    hljs.HASH_COMMENT_MODE
  ];

  // Common AppleScript built-in phrases (used for built_in highlighting)
  const builtInPatterns = [
    /clipboard info/,
    /the clipboard/,
    /info for/,
    /list (disks|folder)/,
    /mount volume/,
    /path to/,
    /(close|open for) access/,
    /(get|set) eof/,
    /current date/,
    /do shell script/,
    /get volume settings/,
    /random number/,
    /set volume/,
    /system attribute/,
    /system info/,
    /time to GMT/,
    /(load|run|store) script/,
    /scripting components/,
    /ASCII (character|number)/,
    /localized string/,
    /choose (application|color|file|file name|folder|from list|remote application|URL)/,
    /display (alert|dialog)/
  ];

  // Common AppleScript keyword phrases (used for keyword highlighting)
  const keywordPatterns = [
    /apart from/,
    /aside from/,
    /instead of/,
    /out of/,
    /greater than/,
    /isn'processRuleBeginHandlers|(doesn'processRuleBeginHandlers|does not) (equal|come before|come after|contain)/,
    /(greater|less) than( or equal)?/,
    /(starts?|ends|begins?) with/,
    /contained by/,
    /comes (before|after)/,
    /a (ref|reference)/,
    /POSIX (file|path)/,
    /(date|time) string/,
    /quoted form/
  ];

  // Helper function assumed to create a regex that matches any of the provided patterns, surrounded by word boundaries
  // XOA(/\b/, COA(...patterns), /\b/) in original code
  // COA is assumed to combine regexes with alternation (|)
  // XOA is assumed to concatenate regexes
  // These helpers must be provided by the environment

  return {
    name: "AppleScript",
    aliases: ["osascript"],
    keywords: {
      keyword:
        "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is isBlobOrFileLikeObject its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the|0 then third through thru timeout times to transaction try until where while whose with without",
      literal:
        "AppleScript false linefeed return getEndIndexOfInteractionEntry quote result space tab true",
      built_in:
        "alias application boolean class constant date file integer list number real record string text activate beep count delay launch log offset read round run say summarize write character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
    },
    contains: [
      // String mode
      quoteStringMode,
      // Number mode
      hljs.C_NUMBER_MODE,
      // Built-in phrases (e.g., 'choose file', 'display dialog')
      {
        className: "built_in",
        begin: XOA(/\b/, COA(...builtInPatterns), /\b/)
      },
      // Special case for 'return' at the start of a line
      {
        className: "built_in",
        begin: /^\s*return\b/
      },
      // Special AppleScript literals
      {
        className: "literal",
        begin: /\b(text item delimiters|current application|missing value)\b/
      },
      // Keyword phrases (e.g., 'greater than', 'starts with')
      {
        className: "keyword",
        begin: XOA(/\b/, COA(...keywordPatterns), /\b/)
      },
      // Handler/function definition (e.g., 'on myHandler(param1, param2)')
      {
        beginKeywords: "on",
        illegal: /[${=;\n]/,
        contains: [hljs.UNDERSCORE_TITLE_MODE, paramsMode]
      },
      // Comments (single-line, multi-line, hash)
      ...commentModes
    ],
    // Illegal patterns for AppleScript (e.g., JavaScript/C-like syntax)
    illegal: /\/\/|->|=>|\[\[/
  };
}

module.exports = createApplescriptHighlightDefinition;