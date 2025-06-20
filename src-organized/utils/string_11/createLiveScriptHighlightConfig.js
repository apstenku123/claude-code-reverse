/**
 * Factory function to create a syntax highlighting configuration for LiveScript language.
 *
 * @param {object} hljs - The highlight.js core object, providing utility modes and helpers.
 * @returns {object} Highlight.js language definition for LiveScript.
 */
function createLiveScriptHighlightConfig(hljs) {
  // Built-in, literal, and keyword lists for LiveScript
  const builtInFunctions = ["npm", "print"];
  const literalValues = ["yes", "no", "on", "off", "isBlobOrFileLikeObject", "that", "void"];
  const languageKeywords = [
    "then", "unless", "until", "loop", "of", "by", "when", "and", "or", "is", "isnt", "not", "isBlobOrFileLikeObject", "that", "otherwise", "from", "to", "til", "fallthrough", "case", "enum", "native", "list", "map", "__hasProp", "__extends", "__slice", "__bind", "__indexOf"
  ];

  // Merge with external keyword, literal, and built-in lists
  const keywords = {
    keyword: ic9.concat(languageKeywords),
    literal: nc9.concat(literalValues),
    built_in: tc9.concat(builtInFunctions)
  };

  // LiveScript identifier regex (allows dashes and underscores)
  const IDENTIFIER_REGEX = "[a-z$_](?:-[0-9A-zA-z$_]|[0-9A-zA-z$_])*";

  // Title mode for function/class names
  const titleMode = hljs.inherit(hljs.TITLE_MODE, {
    begin: IDENTIFIER_REGEX
  });

  // Substitution inside strings: #{ ... }
  const stringSubstitution = {
    className: "subst",
    begin: /#\\{/,
    end: /\}/,
    keywords
  };

  // Substitution for variables inside strings: #var
  const variableSubstitution = {
    className: "subst",
    begin: /#[a-z$_]/,
    end: /(?:-[0-9A-zA-z$_]|[0-9A-zA-z$_])*/,
    keywords
  };

  // Number, string, regex, and embedded JS modes
  const mainModes = [
    hljs.BINARY_NUMBER_MODE,
    {
      className: "number",
      begin: "(\\\\b0[xX][a-F0-9_]+)|(\\\\b\\\\d(\\\\d|_\\\\d)*(\\\\.(\\\\d(\\\\d|_\\\\d)*)?)?(_*[eE]([-+]\\\\d(_\\\\d|\\\\d)*)?)?[_a-z]*)",
      relevance: 0,
      starts: {
        end: "(\\\\s*/)?",
        relevance: 0
      }
    },
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
          contains: [hljs.BACKSLASH_ESCAPE, stringSubstitution, variableSubstitution]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [hljs.BACKSLASH_ESCAPE, stringSubstitution, variableSubstitution]
        },
        {
          begin: /\\\\/,
          end: /(\\s|$)/,
          excludeEnd: true
        }
      ]
    },
    {
      className: "regexp",
      variants: [
        {
          begin: "//",
          end: "//[gim]*",
          contains: [stringSubstitution, hljs.HASH_COMMENT_MODE]
        },
        {
          begin: /\/(?![ *])(\\.|[^\\\/\n])*?\/[gim]*(?=\W)/
        }
      ]
    },
    {
      // Instance variable
      begin: `@${IDENTIFIER_REGEX}`
    },
    {
      // Embedded JavaScript
      begin: "``",
      end: "``",
      excludeBegin: true,
      excludeEnd: true,
      subLanguage: "javascript"
    }
  ];

  // Allow string substitutions to contain all main modes
  stringSubstitution.contains = mainModes;

  // Function parameter list mode
  const functionParams = {
    className: "params",
    begin: "\\(",
    returnBegin: true,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords,
        contains: ["self"].concat(mainModes)
      }
    ]
  };

  // Function arrow operator mode
  const functionArrow = {
    begin: "(#=>|=>|\\\\|>>|-?->|!->)"
  };

  return {
    name: "LiveScript",
    aliases: ["ls"],
    keywords,
    illegal: /\/\*/,
    contains: mainModes.concat([
      hljs.COMMENT("\\\\/\\\\*", "\\\\*\\\\/"),
      hljs.HASH_COMMENT_MODE,
      functionArrow,
      {
        className: "function",
        contains: [titleMode, functionParams],
        returnBegin: true,
        variants: [
          {
            // Standard function definition
            begin: `(${IDENTIFIER_REGEX}\\\\s*(?:=|:=)\\\\s*)?(\\\\(.*\\\\)\\\\s*)?\\\\b->\\\\*?`,
            end: "->\\\\*?"
          },
          {
            // Function with special arrow
            begin: `(${IDENTIFIER_REGEX}\\\\s*(?:=|:=)\\\\s*)?!?(\\\\(.*\\\\)\\\\s*)?\\\\b[-~]{1,2}>\\\\*?`,
            end: "[-~]{1,2}>\\\\*?"
          },
          {
            // Function with optional ! and special arrow
            begin: `(${IDENTIFIER_REGEX}\\\\s*(?:=|:=)\\\\s*)?(\\\\(.*\\\\)\\\\s*)?\\\\b!?[-~]{1,2}>\\\\*?`,
            end: "!?[-~]{1,2}>\\\\*?"
          }
        ]
      },
      {
        className: "class",
        beginKeywords: "class",
        end: "$",
        illegal: /[:="\\[\\]]/,
        contains: [
          {
            beginKeywords: "extends",
            endsWithParent: true,
            illegal: /[:="\\[\\]]/,
            contains: [titleMode]
          },
          titleMode
        ]
      },
      {
        // Object property key
        begin: `${IDENTIFIER_REGEX}:`,
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}

module.exports = createLiveScriptHighlightConfig;