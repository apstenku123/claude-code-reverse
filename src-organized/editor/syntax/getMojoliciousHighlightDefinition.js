/**
 * Returns the syntax highlighting definition for Mojolicious templates.
 *
 * This function defines the language configuration for highlighting Mojolicious template files,
 * specifying meta sections and embedded Perl code blocks.
 *
 * @param {any} highlightJsInstance - The highlight.js instance (not used in this definition, but required by API).
 * @returns {object} The Mojolicious language definition object for highlight.js.
 */
function getMojoliciousHighlightDefinition(highlightJsInstance) {
  return {
    name: "Mojolicious",
    subLanguage: "xml",
    contains: [
      {
        // Match special Perl data sections like __END__ or __DATA__ at the start of a line
        className: "meta",
        begin: "^__(END|DATA)__$"
      },
      {
        // Match lines starting with one or two percent signs, possibly followed by up to two equals signs
        // These lines are treated as Perl code
        begin: "^\\s*%{1,2}={0,2}",
        end: "$",
        subLanguage: "perl"
      },
      {
        // Match embedded Perl code blocks like <% ... %>, <%% ... %%>, <%== ... ==%>, etc.
        begin: "<%{1,2}={0,2}",
        end: "={0,1}%>",
        subLanguage: "perl",
        excludeBegin: true, // Exclude the opening tag from highlighting
        excludeEnd: true    // Exclude the closing tag from highlighting
      }
    ]
  };
}

module.exports = getMojoliciousHighlightDefinition;