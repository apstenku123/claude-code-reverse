/**
 * Factory function that generates a syntax highlighting configuration object for HAML.
 * This configuration is intended for use with a syntax highlighter (e.g., highlight.js),
 * and defines rules for matching HAML syntax, including tags, comments, attributes, and embedded Ruby.
 *
 * @param {object} syntaxHelpers - An object containing helper functions and modes for syntax highlighting.
 *   Expected to provide COMMENT, APOS_STRING_MODE, and QUOTE_STRING_MODE properties.
 * @returns {object} HAML syntax highlighting configuration object.
 */
function createHamlHighlightConfig(syntaxHelpers) {
  return {
    name: "HAML",
    case_insensitive: true,
    contains: [
      // HAML doctype
      {
        className: "meta",
        begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
        relevance: 10
      },
      // HAML comments
      syntaxHelpers.COMMENT(
        "^\\s*(!=#|=#|-#|/).*$",
        false,
        { relevance: 0 }
      ),
      // Ruby code lines (-, =, !=) not followed by #
      {
        begin: "^\\s*(-|=|!=)(?!#)",
        starts: {
          end: "\\n",
          subLanguage: "ruby"
        }
      },
      // HAML tag definition
      {
        className: "tag",
        begin: "^\\s*%",
        contains: [
          // Tag name
          {
            className: "selector-tag",
            begin: "\\w+"
          },
          // updateSnapshotAndNotify selector
          {
            className: "selector-id",
            begin: "#[\\w-]+"
          },
          // Class selector
          {
            className: "selector-class",
            begin: "\\.[\\w-]+"
          },
          // Ruby hash-style attributes: { :key => 'value', ... }
          {
            begin: /\{\s*/,
            end: /\\s*\}/,
            contains: [
              {
                begin: ":\\w+\\s*=>",
                end: ",\\s+",
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: "attr",
                    begin: ":\\w+"
                  },
                  syntaxHelpers.APOS_STRING_MODE,
                  syntaxHelpers.QUOTE_STRING_MODE,
                  {
                    begin: "\\w+",
                    relevance: 0
                  }
                ]
              }
            ]
          },
          // HTML-style attributes: (key='value' ...)
          {
            begin: "\\(\\s*",
            end: "\\s*\\)",
            excludeEnd: true,
            contains: [
              {
                begin: "\\w+\\s*=",
                end: "\\s+",
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: "attr",
                    begin: "\\w+",
                    relevance: 0
                  },
                  syntaxHelpers.APOS_STRING_MODE,
                  syntaxHelpers.QUOTE_STRING_MODE,
                  {
                    begin: "\\w+",
                    relevance: 0
                  }
                ]
              }
            ]
          }
        ]
      },
      // Inline Ruby evaluation or filter
      {
        begin: "^\\s*[=~]\\s*"
      },
      // Embedded Ruby interpolation (#{ ... })
      {
        begin: /#\{/,
        starts: {
          end: /\}/,
          subLanguage: "ruby"
        }
      }
    ]
  };
}

module.exports = createHamlHighlightConfig;
