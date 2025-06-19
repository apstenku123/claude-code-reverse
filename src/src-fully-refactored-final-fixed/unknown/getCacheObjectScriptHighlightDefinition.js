/**
 * Returns the syntax highlighting definition for Caché Object Script for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing comment modes and utilities.
 * @returns {object} Highlight.js language definition object for Caché Object Script.
 */
function getCacheObjectScriptHighlightDefinition(hljs) {
  return {
    name: "Caché Object Script",
    case_insensitive: true,
    aliases: ["cls"],
    keywords: "property parameter class classmethod clientmethod extends as break catch close continue do d|0 else elseif for goto halt hang h|0 if job j|0 kill k|0 lock invokeHandlerWithArguments|0 merge new open quit q|0 read r|0 return set createInteractionAccessor|0 tcommit throw trollback try tstart use view while write processWithTransformedObservable|0 xecute x|0 zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert zload zprint zremove zsave zzprint fetchInstanceMetadata mvcall mvcrt mvdim mvprint zquit zsync ascii",
    contains: [
      // Numeric literals (integers and decimals)
      {
        className: "number",
        begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
        relevance: 0
      },
      // String literals (double-quoted, with escaped double quotes)
      {
        className: "string",
        variants: [
          {
            begin: '"',
            end: '"',
            contains: [
              {
                begin: '""', // Escaped double quote
                relevance: 0
              }
            ]
          }
        ]
      },
      // Single-line and block comments from highlight.js core
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Semicolon-based comments
      {
        className: "comment",
        begin: /;/,
        end: "$",
        relevance: 0
      },
      // Built-in variables and functions (dollar, dot, caret notation)
      {
        className: "built_in",
        begin: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
      },
      {
        className: "built_in",
        begin: /\$\$\$[a-zA-Z]+/
      },
      {
        className: "built_in",
        begin: /%[a-z]+(?:\.[a-z]+)*/
      },
      // Symbol references (caret notation)
      {
        className: "symbol",
        begin: /\^%?[a-zA-Z][\w]*/
      },
      // Preprocessor and macro keywords
      {
        className: "keyword",
        begin: /##class|##super|#define|#dim/
      },
      // Embedded SQL blocks
      {
        begin: /&sql\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        subLanguage: "sql"
      },
      // Embedded JavaScript blocks
      {
        begin: /&(js|jscript|javascript)</,
        end: />/,
        excludeBegin: true,
        excludeEnd: true,
        subLanguage: "javascript"
      },
      // Embedded HTML/XML blocks
      {
        begin: /&html<\s*</,
        end: />\s*>/,
        subLanguage: "xml"
      }
    ]
  };
}

module.exports = getCacheObjectScriptHighlightDefinition;