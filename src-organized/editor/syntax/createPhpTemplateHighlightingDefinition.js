/**
 * Generates a syntax highlighting definition for PHP templates embedded in XML.
 *
 * This function is designed for use with syntax highlighters like highlight.js.
 * It defines how to recognize PHP code blocks within XML (such as HTML),
 * including special handling for PHP comments and binary string literals.
 *
 * @param {object} syntaxHelpers - An object containing helper modes and an 'inherit' method for extending modes.
 * @param {function} syntaxHelpers.inherit - Function to create a new mode by inheriting from an existing one.
 * @param {object} syntaxHelpers.APOS_STRING_MODE - Mode definition for single-quoted strings.
 * @param {object} syntaxHelpers.QUOTE_STRING_MODE - Mode definition for double-quoted strings.
 * @returns {object} a language definition object for PHP templates embedded in XML.
 */
function createPhpTemplateHighlightingDefinition(syntaxHelpers) {
  return {
    name: "PHP template",
    subLanguage: "xml",
    contains: [
      {
        // Match PHP opening tag (<?php or <? or <?=) and closing tag (?>)
        begin: /<\?(php|=)?/,
        end: /\?>/,
        subLanguage: "php",
        contains: [
          {
            // Skip PHP block comments (/* ... */)
            begin: "/\*",
            end: "\\*/",
            skip: true
          },
          {
            // Skip PHP binary double-quoted strings (b"...")
            begin: 'b"',
            end: '"',
            skip: true
          },
          {
            // Skip PHP binary single-quoted strings (b'...')
            begin: "b'",
            end: "'",
            skip: true
          },
          // Inherit from the standard single-quoted string mode, but skip highlighting
          syntaxHelpers.inherit(syntaxHelpers.APOS_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          }),
          // Inherit from the standard double-quoted string mode, but skip highlighting
          syntaxHelpers.inherit(syntaxHelpers.QUOTE_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          })
        ]
      }
    ]
  };
}

module.exports = createPhpTemplateHighlightingDefinition;