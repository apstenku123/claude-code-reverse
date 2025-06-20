/**
 * Defines syntax highlighting rules for the Oxygene programming language (a Pascal dialect).
 *
 * @param {object} hljs - The highlight.js language definition helper object.
 * @returns {object} Highlight.js language definition for Oxygene.
 */
function defineOxygeneHighlighting(hljs) {
  // Define Oxygene language keywords and keyword matching pattern
  const oxygeneKeywords = {
    $pattern: /\.?\w+/,
    keyword:
      "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained"
  };

  // Define block comment: { ... }
  const blockCommentCurly = hljs.COMMENT(/\{/, /\}/, {
    relevance: 0
  });

  // Define block comment: (* ... *)
  const blockCommentParentheses = hljs.COMMENT("\\(\\*", "\\*\\)", {
    relevance: 10
  });

  // Define single-quoted string, with doubled single-quote escaping
  const singleQuotedString = {
    className: "string",
    begin: "'",
    end: "'",
    contains: [
      {
        begin: "''" // Escaped single quote
      }
    ]
  };

  // Define character code string: #123 or #10#13 etc.
  const charCodeString = {
    className: "string",
    begin: "(#\\d+)+"
  };

  // Define function/procedure/method definitions
  const functionDefinition = {
    className: "function",
    beginKeywords: "function constructor destructor procedure method",
    end: "[:;]",
    keywords: "function constructor|10 destructor|10 procedure|10 method|10",
    contains: [
      hljs.TITLE_MODE, // Function name
      {
        className: "params",
        begin: "\\(",
        end: "\\)",
        keywords: oxygeneKeywords,
        contains: [singleQuotedString, charCodeString] // Strings inside params
      },
      blockCommentCurly,
      blockCommentParentheses
    ]
  };

  // Return the full language definition object
  return {
    name: "Oxygene",
    case_insensitive: true,
    keywords: oxygeneKeywords,
    illegal: '("|\\$[extractNestedPropertyOrArray-Zg-z]|\\/\*|</|=>|->)', // Illegal patterns for Oxygene
    contains: [
      blockCommentCurly,
      blockCommentParentheses,
      hljs.C_LINE_COMMENT_MODE, // // line comments
      singleQuotedString,
      charCodeString,
      hljs.NUMBER_MODE, // Numbers
      functionDefinition,
      {
        className: "class",
        begin: "=\\bclass\\b",
        end: "end;",
        keywords: oxygeneKeywords,
        contains: [
          singleQuotedString,
          charCodeString,
          blockCommentCurly,
          blockCommentParentheses,
          hljs.C_LINE_COMMENT_MODE,
          functionDefinition
        ]
      }
    ]
  };
}

module.exports = defineOxygeneHighlighting;