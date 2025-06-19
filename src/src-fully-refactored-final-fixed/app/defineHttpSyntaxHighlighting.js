/**
 * Defines syntax highlighting rules for HTTP messages for use in a syntax highlighter (e.g., highlight.js).
 * Handles HTTP request and response lines, headers, and their structure.
 *
 * @param {object} syntaxUtils - Utility object providing helper functions (e.g., inherit, regex builder).
 * @returns {object} Syntax highlighting definition for HTTP.
 */
function defineHttpSyntaxHighlighting(syntaxUtils) {
  // Destructure helper functions from the utilities parameter
  const { inherit } = syntaxUtils;
  // concatenateSourcePatterns is assumed to be a regex builder utility (external dependency)
  // Example: concatenateSourcePatterns(prefix, pattern, lookahead)
  //
  // Define a rule for HTTP header attributes (e.g., 'Content-Type: value')
  const headerAttributeRule = {
    className: "attribute",
    begin: concatenateSourcePatterns("^", /[A-Za-z0-9-]+/, "(?=:\\s)"), // Match header name at line start, before colon and space
    starts: {
      contains: [
        {
          className: "punctuation",
          begin: /: /, // Match the colon and space after header name
          relevance: 0,
          starts: {
            end: "$", // Match until end of line (header value)
            relevance: 0
          }
        }
      ]
    }
  };

  // Define rules for what can follow a header (either more headers or a blank line)
  const headerBlockContains = [
    headerAttributeRule,
    {
      begin: "\n\n", // Blank line indicates end of headers/start of body
      starts: {
        subLanguage: [], // Placeholder for possible embedded language
        endsWithParent: true
      }
    }
  ];

  return {
    name: "HTTP",
    aliases: ["https"],
    illegal: /\s/, // Disallow non-whitespace at top level (enforces structure)
    contains: [
      // HTTP response line (e.g., HTTP/1.1 200 processAndFormatTokens)
      {
        begin: "^(?=HTTP/(2|1\\.[01]) \\d{3})", // Lookahead for HTTP version and status code
        end: /$/,
        contains: [
          {
            className: "meta",
            begin: "HTTP/(2|1\\.[01])" // Match HTTP version
          },
          {
            className: "number",
            begin: "\\b\\d{3}\\b" // Match status code
          }
        ],
        starts: {
          end: /\b\b/, // End immediately (zero-width, allows following headers)
          illegal: /\s/, // Disallow non-whitespace
          contains: headerBlockContains
        }
      },
      // HTTP request line (e.g., GET /path HTTP/1.1)
      {
        begin: "(?=^[a-zA]+ (.*?) HTTP/(2|1\\.[01])$)", // Lookahead for request line
        end: /$/,
        contains: [
          {
            className: "string",
            begin: " ",
            end: " ",
            excludeBegin: true,
            excludeEnd: true // Match the request path
          },
          {
            className: "meta",
            begin: "HTTP/(2|1\\.[01])" // Match HTTP version
          },
          {
            className: "keyword",
            begin: "[a-zA]+" // Match HTTP method
          }
        ],
        starts: {
          end: /\b\b/, // End immediately (zero-width, allows following headers)
          illegal: /\s/,
          contains: headerBlockContains
        }
      },
      // HTTP header attribute (with lowered relevance to avoid false positives)
      inherit(headerAttributeRule, {
        relevance: 0
      })
    ]
  };
}

module.exports = defineHttpSyntaxHighlighting;
