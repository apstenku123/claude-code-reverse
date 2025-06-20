/**
 * Returns a syntax highlighting definition object for Mojolicious templates.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 * It specifies how to recognize Mojolicious-specific constructs and embedded Perl code.
 *
 * @param {any} options - Optional configuration or context (currently unused).
 * @returns {object} Highlighting definition for Mojolicious templates.
 */
function getMojoliciousHighlightingDefinition(options) {
  return {
    name: "Mojolicious",
    subLanguage: "xml", // Mojolicious templates are primarily XML/HTML
    contains: [
      {
        className: "meta",
        begin: "^__(END|DATA)__$" // Match special Perl markers at the start of a line
      },
      {
        begin: "^\\s*%{1,2}={0,2}", // Match lines starting with %, %% or with optional =
        end: "$", // Until end of line
        subLanguage: "perl" // Highlight as Perl code
      },
      {
        begin: "<%{1,2}={0,2}", // Match Mojolicious Perl block start tags like <% %>, <%% %%>, <%== %>, etc.
        end: "={0,1}%>", // Match Mojolicious Perl block end tags like %>, =%>
        subLanguage: "perl", // Highlight as Perl code
        excludeBegin: true, // Exclude the opening tag from highlighting as Perl
        excludeEnd: true // Exclude the closing tag from highlighting as Perl
      }
    ]
  };
}

module.exports = getMojoliciousHighlightingDefinition;