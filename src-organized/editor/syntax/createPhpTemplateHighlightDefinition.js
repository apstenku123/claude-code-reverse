/**
 * Generates a syntax highlighting definition for PHP templates embedded in XML.
 *
 * This function is intended for use with syntax highlighting libraries (such as highlight.js).
 * It defines how PHP code blocks within XML (e.g., HTML) should be recognized and highlighted.
 *
 * @param {object} syntaxHelpers - An object containing string mode definitions and an 'inherit' utility.
 *   Expected properties:
 *     - APOS_STRING_MODE: Definition for single-quoted strings
 *     - QUOTE_STRING_MODE: Definition for double-quoted strings
 *     - inherit: Function to create a new mode by inheriting and overriding properties
 * @returns {object} Highlight.js language definition for PHP templates
 */
function createPhpTemplateHighlightDefinition(syntaxHelpers) {
  return {
    name: "PHP template",
    subLanguage: "xml",
    contains: [
      {
        // Match PHP code blocks: <?php ... ?> or <?= ... ?>
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
            // Skip binary double-quoted strings (b"...")
            begin: 'b"',
            end: '"',
            skip: true
          },
          {
            // Skip binary single-quoted strings (b'...')
            begin: "b'",
            end: "'",
            skip: true
          },
          // Inherit single-quoted string mode, but skip highlighting
          syntaxHelpers.inherit(syntaxHelpers.APOS_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          }),
          // Inherit double-quoted string mode, but skip highlighting
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

module.exports = createPhpTemplateHighlightDefinition;