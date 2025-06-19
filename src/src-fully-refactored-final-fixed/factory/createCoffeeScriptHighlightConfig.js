function createCoffeeScriptHighlightConfig(hljs) {
  const builtInFunctions = ["npm", "print"];
  const literals = ["yes", "no", "on", "off"];
  const keywords = [
    "then", "unless", "until", "loop", "by", "when", "and", "is", "isnt", "not"
  ];
  const reservedWords = ["var", "const", "let", "function", "static"];

  const excludeReserved = reserved => keyword => !reserved.includes(keyword);

  const coffeeScriptKeywords = {
    keyword: keywords.filter(excludeReserved(reservedWords)),
    literal: literals,
    built_in: builtInFunctions
  };

  const IDENTIFIER = "[a-zA-Z$_][0-9a-zA-Z$_]*";

  const substitutionMode = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: coffeeScriptKeywords
  };

  const valueModes = [
    hljs.BINARY_NUMBER_MODE,
    hljs.inherit(hljs.C_NUMBER_MODE, {
      starts: {
        end: "(\\*/)?",
        relevance: 0
      }
    }),
    {
      className: "string",
      variants: [
        {
          begin: /'''/,
          end: /'''/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /'/,
          end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"""/,
          end: /"""/,
          contains: [hljs.BACKSLASH_ESCAPE, substitutionMode]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [hljs.BACKSLASH_ESCAPE, substitutionMode]
        }
      ]
    },
    {
      className: "regexp",
      variants: [
        {
          begin: "///",
          end: "///",
          contains: [substitutionMode, hljs.HASH_COMMENT_MODE]
        },
        {
          begin: "//[gim]{0,3}(?=\\W)",
          relevance: 0
        },
        {
          begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
        }
      ]
    },
    {
      begin: `@${IDENTIFIER}`
    },
    {
      subLanguage: "javascript",
      excludeBegin: true,
      excludeEnd: true,
      variants: [
        {
          begin: "```",
          end: "```"
        },
        {
          begin: "`",
          end: "`"
        }
      ]
    }
  ];

  substitutionMode.contains = valueModes;

  const titleMode = hljs.inherit(hljs.TITLE_MODE, {
    begin: IDENTIFIER
  });

  const ARROW_FUNCTION_PATTERN = "(\\(.*\\)\\s*)?=>";

  const paramsMode = {
    className: "params",
    begin: "\\(",
    end: "\\)",
    keywords: coffeeScriptKeywords,
    contains: ["self"].concat(valueModes)
  };

  return {
    name: "CoffeeScript",
    aliases: ["coffee", "cson", "iced"],
    keywords: coffeeScriptKeywords,
    illegal: /\/\*/,
    contains: valueModes.concat([
      hljs.COMMENT("###", "###"),
      hljs.HASH_COMMENT_MODE,
      {
        className: "function",
        begin: `^\\s*${IDENTIFIER}\\s*=\\s*${ARROW_FUNCTION_PATTERN}`,
        end: "=>",
        returnBegin: true,
        contains: [titleMode, paramsMode]
      },
      {
        begin: /[:\(,=]\s*/,
        relevance: 0,
        contains: [
          {
            className: "function",
            begin: ARROW_FUNCTION_PATTERN,
            end: "=>",
            returnBegin: true,
            contains: [paramsMode]
          }
        ]
      },
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
      {
        begin: `${IDENTIFIER}:`,
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}

module.exports = createCoffeeScriptHighlightConfig;