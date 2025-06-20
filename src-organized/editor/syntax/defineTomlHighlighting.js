/**
 * Defines syntax highlighting rules for TOML and INI files.
 *
 * @param {object} hljs - The highlight.js instance providing regexes and helpers.
 * @returns {object} Highlight.js language definition for TOML/INI.
 */
function defineTomlHighlighting(hljs) {
  // Number highlighting: supports underscores and standard number regex
  const numberMode = {
    className: "number",
    relevance: 0,
    variants: [
      {
        begin: /([+-]+)?[\d]+_[\d_]+/
      },
      {
        begin: hljs.NUMBER_RE
      }
    ]
  };

  // Comment highlighting: supports both ';' and '#' comments
  const commentMode = hljs.COMMENT();
  commentMode.variants = [
    {
      begin: /;/,
      end: /$/
    },
    {
      begin: /#/, 
      end: /$/
    }
  ];

  // Variable highlighting: supports $var and ${var}
  const variableMode = {
    className: "variable",
    variants: [
      {
        begin: /\$[\w\d"][\w\d_]*/
      },
      {
        begin: /\$\{(.*?)\}/
      }
    ]
  };

  // Literal highlighting: for boolean and on/off/yes/no values
  const literalMode = {
    className: "literal",
    begin: /\bon|off|true|false|yes|no\b/
  };

  // String highlighting: supports single, double, and triple quotes
  const stringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: "'''",
        end: "'''",
        relevance: 10
      },
      {
        begin: '"""',
        end: '"""',
        relevance: 10
      },
      {
        begin: '"',
        end: '"'
      },
      {
        begin: "'",
        end: "'"
      }
    ]
  };

  // Array highlighting: supports nested values inside brackets
  const arrayMode = {
    begin: /\[/,
    end: /\]/,
    contains: [commentMode, literalMode, variableMode, stringMode, numberMode, "self"],
    relevance: 0
  };

  // Attribute key highlighting: supports bare, quoted, and dotted keys
  // Jc9 and VSA are helper functions for key parsing
  const bareOrQuotedKey = Jc9(/[a-zA-Z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/);
  const dottedKeyPattern = VSA(
    bareOrQuotedKey,
    "(\\s*\\.\\s*",
    bareOrQuotedKey,
    ")*",
    Fc9(/\s*=\s*[^#\s]/)
  );

  return {
    name: "TOML, also INI",
    aliases: ["toml"],
    case_insensitive: true,
    illegal: /\s/,
    contains: [
      commentMode,
      {
        className: "section",
        begin: /\[+/,
        end: /\]+/
      },
      {
        begin: dottedKeyPattern,
        className: "attr",
        starts: {
          end: /$/,
          contains: [commentMode, arrayMode, literalMode, variableMode, stringMode, numberMode]
        }
      }
    ]
  };
}

module.exports = defineTomlHighlighting;