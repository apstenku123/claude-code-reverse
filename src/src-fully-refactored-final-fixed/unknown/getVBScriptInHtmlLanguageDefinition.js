/**
 * Returns a language definition object for highlighting VBScript embedded within HTML.
 * This definition is intended for use with syntax highlighters that support sub-languages.
 *
 * @returns {Object} Language definition for VBScript in HTML
 */
function getVBScriptInHtmlLanguageDefinition() {
  return {
    // Name of the language definition
    name: "VBScript in HTML",
    // The main language context is XML (HTML)
    subLanguage: "xml",
    // Contains rules for detecting VBScript code blocks
    contains: [
      {
        // VBScript code blocks start with <% and end with %>
        begin: "<%",
        end: "%>",
        // Specify that the code inside is VBScript
        subLanguage: "vbscript"
      }
    ]
  };
}

module.exports = getVBScriptInHtmlLanguageDefinition;