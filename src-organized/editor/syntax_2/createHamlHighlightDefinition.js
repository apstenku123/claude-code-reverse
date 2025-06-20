/**
 * Factory function that creates a syntax highlighting definition for HAML templates.
 * This is designed for use with a syntax highlighting library (such as highlight.js),
 * and defines the rules for matching HAML syntax, including tags, comments, attributes, and embedded Ruby.
 *
 * @param {object} syntaxHelpers - An object providing helper functions and constants for defining syntax rules.
 *   Expected to include COMMENT, APOS_STRING_MODE, and QUOTE_STRING_MODE properties.
 * @returns {object} HAML language definition object for syntax highlighting.
 */
function createHamlHighlightDefinition(syntaxHelpers) {
  return {
    name: "HAML",
    case_insensitive: true,
    contains: [
      // HAML doctype declaration
      {
        className: "meta",
        begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
        relevance: 10
      },
      // HAML comments (silent, loud, or normal)
      syntaxHelpers.COMMENT("^\\s*(!=#|=#|-#|/).*$", false, {
        relevance: 0
      }),
      // Ruby code lines (script or evaluation)
      {
        begin: "^\\s*(-|=|!=)(?!#)",
        starts: {
          end: "\\n",
          subLanguage: "ruby"
        }
      },
      // HAML tag definitions
      {
        className: "tag",
        begin: "^\\s*%",
        contains: [
          // Tag name
          {
            className: "selector-tag",
            begin: "\\w+"
          },
          // Tag id
          {
            className: "selector-id",
            begin: "#[\\w-]+"
          },
          // Tag class
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
      // Inline Ruby evaluation or output
      {
        begin: "^\\s*[=~]\\s*"
      },
      // Embedded Ruby interpolation
      {
        begin: /#\{/, // Start of Ruby interpolation
        starts: {
          end: /\}/,
          subLanguage: "ruby"
        }
      }
    ]
  };
}

module.exports = createHamlHighlightDefinition;