/**
 * Factory function that returns a syntax highlighting definition for Apache configuration files.
 * Designed for use with highlight.js or similar syntax highlighters.
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide common modes and utilities.
 * @returns {object} Syntax highlighting definition for Apache config files.
 */
function createApacheConfigHighlightDefinition(hljs) {
  // Matches numbers prefixed with $ or %, e.g., $123, %456
  const variableNumberMode = {
    className: "number",
    begin: /[$%]\d+/
  };

  // Matches plain numbers, e.g., 123
  const numberMode = {
    className: "number",
    begin: /\\d+/
  };

  // Matches IPv4 addresses, optionally with a port, e.g., 192.168.0.1:8080
  const ipAddressWithPortMode = {
    className: "number",
    begin: /\\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?/
  };

  // Matches port numbers prefixed with a colon, e.g., :8080
  const portNumberMode = {
    className: "number",
    begin: /:\d{1,5}/
  };

  return {
    name: "Apache config",
    aliases: ["apacheconf"],
    case_insensitive: true,
    contains: [
      // Comments starting with #
      hljs.HASH_COMMENT_MODE,
      {
        className: "section",
        begin: /<\/?/, // Section start or end, e.g., <Directory>
        end: />/,
        contains: [
          ipAddressWithPortMode,
          portNumberMode,
          // Quoted strings inside section tags, with zero relevance
          hljs.inherit(hljs.QUOTE_STRING_MODE, { relevance: 0 })
        ]
      },
      {
        className: "attribute",
        begin: /\\w+/,
        relevance: 0,
        keywords: {
          nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
        },
        starts: {
          end: /$/,
          relevance: 0,
          keywords: {
            literal: "on off all deny allow"
          },
          contains: [
            {
              className: "meta",
              begin: /\\s\[/, // Metadata in square brackets, e.g., [condition]
              end: /\]$/
            },
            {
              className: "variable",
              begin: /[\$%]\{/, // Variables like ${VAR} or %{VAR}
              end: /\}/,
              contains: ["self", variableNumberMode]
            },
            ipAddressWithPortMode,
            numberMode,
            hljs.QUOTE_STRING_MODE
          ]
        }
      }
    ],
    // Illegal any non-whitespace character outside of defined modes
    illegal: /\s/
  };
}

module.exports = createApacheConfigHighlightDefinition;