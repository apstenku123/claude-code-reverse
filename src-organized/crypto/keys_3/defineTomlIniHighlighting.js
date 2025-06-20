/**
 * Defines syntax highlighting rules for TOML and INI configuration files.
 *
 * @param {object} hljs - The highlight.js language definition object, providing regexes and helpers.
 * @returns {object} The language definition object for TOML/INI highlighting.
 */
function defineTomlIniHighlighting(hljs) {
  // Number highlighting: supports numbers with underscores and standard numbers
  const numberMode = {
    className: "number",
    relevance: 0,
    variants: [
      {
        begin: /([+-]+)?[\d]+_[\d_]+/ // e.g. 1_000_000
      },
      {
        begin: hljs.NUMBER_RE // standard number regex from hljs
      }
    ]
  };

  // Comment highlighting: supports both ';' and '#' style comments
  const commentMode = hljs.COMMENT();
  commentMode.variants = [
    {
      begin: /;/,
      end: /$/
    },
    {
      begin: /#/, // hash comments
      end: /$/
    }
  ];

  // Variable highlighting: $var and ${var}
  const variableMode = {
    className: "variable",
    variants: [
      {
        begin: /\$[\w\d"][\w\d_]*/ // $var, $var_name
      },
      {
        begin: /\$\{(.*?)\}/ // ${var}
      }
    ]
  };

  // Literal highlighting: on/off/true/false/yes/no
  const literalMode = {
    className: "literal",
    begin: /\bon|off|true|false|yes|no\b/
  };

  // String highlighting: supports single, double, triple single, and triple double quotes
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

  // Array highlighting: [ ... ]
  const arrayMode = {
    begin: /\[/,
    end: /\]/,
    contains: [commentMode, literalMode, variableMode, stringMode, numberMode, "self"],
    relevance: 0
  };

  // Attribute key: matches unquoted, double-quoted, or single-quoted keys
  const keyPattern = Jc9(
    /[a-zA-Z0-9_-]+/, // unquoted
    /"(\\"|[^"])*"/, // double-quoted
    /'[^']*'/ // single-quoted
  );

  // Attribute assignment: key(.key)* = value
  const assignmentPattern = VSA(
    keyPattern,
    "(\\s*\\.\\s*",
    keyPattern,
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
        begin: assignmentPattern,
        className: "attr",
        starts: {
          end: /$/,
          contains: [commentMode, arrayMode, literalMode, variableMode, stringMode, numberMode]
        }
      }
    ]
  };
}

module.exports = defineTomlIniHighlighting;