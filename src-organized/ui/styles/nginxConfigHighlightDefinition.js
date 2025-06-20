/**
 * Returns the syntax highlighting definition for Nginx configuration files for highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing regexes and common modes.
 * @returns {object} Highlight.js language definition object for Nginx config files.
 */
function nginxConfigHighlightDefinition(hljs) {
  // Variable highlighting for $var, ${var}, $1, etc.
  const variableMode = {
    className: "variable",
    variants: [
      {
        begin: /\$\d+/
      },
      {
        begin: /\$\{/, // ${var}
        end: /\}/
      },
      {
        begin: new RegExp("[$@]" + hljs.UNDERSCORE_IDENT_RE) // $var or @var
      }
    ]
  };

  // Main value/argument parsing mode for directives
  const directiveArgumentMode = {
    endsWithParent: true,
    keywords: {
      $pattern: "[a-z/_]+",
      literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
    },
    relevance: 0,
    illegal: "=>",
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: "string",
        contains: [hljs.BACKSLASH_ESCAPE, variableMode],
        variants: [
          {
            begin: /"/,
            end: /"/
          },
          {
            begin: /'/,
            end: /'/
          }
        ]
      },
      {
        // URL-like values (e.g., proxy_pass http://...)
        begin: "([a-z]+):/",
        end: "\\s",
        endsWithParent: true,
        excludeEnd: true,
        contains: [variableMode]
      },
      {
        className: "regexp",
        contains: [hljs.BACKSLASH_ESCAPE, variableMode],
        variants: [
          {
            begin: "\\s\\^",
            end: "\\s|\\{|;",
            returnEnd: true
          },
          {
            begin: "~\\*?\\s+",
            end: "\\s|\\{|;",
            returnEnd: true
          },
          {
            begin: /\*(\.[a-z\-]+)+/
          },
          {
            begin: /([a-z\-]+\.)+\*/
          }
        ]
      },
      {
        // IPv4 address with optional port
        className: "number",
        begin: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?\b/
      },
      {
        // Numeric values with optional unit suffix (e.g., 10k, 5m)
        className: "number",
        begin: /\b\d+[kKmMgGdshdwy]*\b/,
        relevance: 0
      },
      variableMode
    ]
  };

  return {
    name: "Nginx config",
    aliases: ["nginxconf"],
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        // Section blocks: e.g., http { ... }
        begin: hljs.UNDERSCORE_IDENT_RE + "\\s+\\{",
        returnBegin: true,
        end: /\{/,
        contains: [
          {
            className: "section",
            begin: hljs.UNDERSCORE_IDENT_RE
          }
        ],
        relevance: 0
      },
      {
        // Directive statements: e.g., listen 80;
        begin: hljs.UNDERSCORE_IDENT_RE + "\\s",
        end: ";|\\{",
        returnBegin: true,
        contains: [
          {
            className: "attribute",
            begin: hljs.UNDERSCORE_IDENT_RE,
            starts: directiveArgumentMode
          }
        ],
        relevance: 0
      }
    ],
    illegal: "[^\\s\\}]"
  };
}

module.exports = nginxConfigHighlightDefinition;