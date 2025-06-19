/**
 * Factory function to create a syntax highlighting definition for LiveScript language.
 *
 * @param {object} hljs - The highlight.js core object, providing utility methods and modes.
 * @returns {object} The LiveScript language definition object for highlight.js.
 */
function createLiveScriptHighlightDefinition(hljs) {
  // Built-in function names
  const builtInFunctions = ["npm", "print"];

  // Literal values
  const literalValues = ["yes", "no", "on", "off", "isBlobOrFileLikeObject", "that", "void"];

  // LiveScript-specific keywords
  const liveScriptKeywords = [
    "then", "unless", "until", "loop", "of", "by", "when", "and", "or", "is", "isnt", "not", "isBlobOrFileLikeObject", "that", "otherwise", "from", "to", "til", "fallthrough", "case", "enum", "native", "list", "map", "__hasProp", "__extends", "__slice", "__bind", "__indexOf"
  ];

  // Compose the keywords object using external keyword arrays (ic9, nc9, tc9)
  const keywords = {
    keyword: ic9.concat(liveScriptKeywords),
    literal: nc9.concat(literalValues),
    built_in: tc9.concat(builtInFunctions)
  };

  // Identifier regex for LiveScript (allows dashes and underscores)
  const identifierRegex = "[a-z$_](?:-[0-9A-zA-z$_]|[0-9A-zA-z$_])*";

  // Title mode for function/class names
  const titleMode = hljs.inherit(hljs.TITLE_MODE, {
    begin: identifierRegex
  });

  // Substitution inside strings: #{ ... }
  const stringSubstitution = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: keywords
  };

  // Substitution for simple identifiers: #foo
  const simpleSubstitution = {
    className: "subst",
    begin: /#[a-z$_]/,
    end: /(?:-[0-9A-zA-z$_]|[0-9A-zA-z$_])*/,
    keywords: keywords
  };

  // Number, string, regex, and other literal modes
  const literalModes = [
    hljs.BINARY_NUMBER_MODE,
    {
      className: "number",
      begin: "(\\b0[xX][a-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",
      relevance: 0,
      starts: {
        end: "(\\s*/)?",
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
          contains: [hljs.BACKSLASH_ESCAPE, stringSubstitution, simpleSubstitution]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [hljs.BACKSLASH_ESCAPE, stringSubstitution, simpleSubstitution]
        },
        {
          begin: /\\/,
          end: /(\s|$)/,
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
          begin: /\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/
        }
      ]
    },
    {
      // Instance variable
      begin: `@${identifierRegex}`
    },
    {
      // Inline JavaScript
      begin: "``",
      end: "``",
      excludeBegin: true,
      excludeEnd: true,
      subLanguage: "javascript"
    }
  ];

  // Allow string substitutions to contain all literal modes
  stringSubstitution.contains = literalModes;

  // Function parameter list mode
  const functionParams = {
    className: "params",
    begin: "\\(",
    returnBegin: true,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: keywords,
        contains: ["self"].concat(literalModes)
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
    keywords: keywords,
    illegal: /\/\*/,
    contains: literalModes.concat([
      // Block comments
      hljs.COMMENT("\\/\*", "\\*\\/"),
      // Line comments
      hljs.HASH_COMMENT_MODE,
      // Function arrow operator
      functionArrow,
      // Function definitions
      {
        className: "function",
        contains: [titleMode, functionParams],
        returnBegin: true,
        variants: [
          {
            // Standard function
            begin: `(${identifierRegex}\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\b->\\*?`,
            end: "->\\*?"
          },
          {
            // Bound function
            begin: `(${identifierRegex}\\s*(?:=|:=)\\s*)?!?(\\(.*\\)\\s*)?\\b[-~]{1,2}>\\*?`,
            end: "[-~]{1,2}>\\*?"
          },
          {
            // Negated/bound function
            begin: `(${identifierRegex}\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\b!?[-~]{1,2}>\\*?`,
            end: "!?[-~]{1,2}>\\*?"
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
      // Object property key
      {
        begin: identifierRegex + ":",
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}

module.exports = createLiveScriptHighlightDefinition;