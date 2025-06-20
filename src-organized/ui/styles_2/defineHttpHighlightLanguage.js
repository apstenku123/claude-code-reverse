/**
 * Defines syntax highlighting rules for HTTP request and response messages.
 *
 * @param {object} hljs - The highlight.js core object, used to inherit and extend language definitions.
 * @returns {object} Language definition object for HTTP highlighting.
 *
 * The function builds a language definition for HTTP, including rules for headers, status lines, and request lines.
 */
function defineHttpHighlightLanguage(hljs) {
  // Helper for matching attribute (header) names
  const headerNameRule = {
    className: "attribute",
    begin: concatenateSourcePatterns("^", /[A-Za-z0-9-]+/, "(?=:\\s)"),
    starts: {
      contains: [
        {
          className: "punctuation",
          begin: /: /,
          relevance: 0,
          starts: {
            end: "$",
            relevance: 0
          }
        }
      ]
    }
  };

  // Rules for header lines and blank lines separating headers from body
  const headerSectionRules = [
    headerNameRule,
    {
      begin: "\n\n", // Blank line indicates end of headers
      starts: {
        subLanguage: [], // Allows embedding other languages (e.g., JSON, XML) in the body
        endsWithParent: true
      }
    }
  ];

  return {
    name: "HTTP",
    aliases: ["https"],
    illegal: /\s/, // Disallow non-whitespace outside defined rules
    contains: [
      // HTTP response status line
      {
        begin: "^(?=HTTP/(2|1\\.[01]) \\d{3})",
        end: /$/,
        contains: [
          {
            className: "meta",
            begin: "HTTP/(2|1\\.[01])"
          },
          {
            className: "number",
            begin: "\\b\\d{3}\\b"
          }
        ],
        starts: {
          end: /\b\b/, // End immediately after line
          illegal: /\s/,
          contains: headerSectionRules
        }
      },
      // HTTP request line
      {
        begin: "(?=^[a-zA]+ (.*?) HTTP/(2|1\\.[01])$)",
        end: /$/,
        contains: [
          {
            className: "string",
            begin: " ",
            end: " ",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "meta",
            begin: "HTTP/(2|1\\.[01])"
          },
          {
            className: "keyword",
            begin: "[a-zA]+"
          }
        ],
        starts: {
          end: /\b\b/, // End immediately after line
          illegal: /\s/,
          contains: headerSectionRules
        }
      },
      // HTTP header line (with reduced relevance)
      hljs.inherit(headerNameRule, {
        relevance: 0
      })
    ]
  };
}

module.exports = defineHttpHighlightLanguage;
