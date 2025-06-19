/**
 * Factory function that creates a language definition object for the Mizar language.
 * This object includes the language name, a list of Mizar-specific keywords, and comment syntax configuration.
 *
 * @param {object} languageHelpers - An object containing helper functions for language parsing/highlighting.
 * @param {function} languageHelpers.COMMENT - Function to define comment syntax for the language.
 * @returns {object} Language definition object for Mizar, suitable for use in syntax highlighters or parsers.
 */
function createMizarLanguageDefinition(languageHelpers) {
  return {
    name: "Mizar",
    // List of all reserved keywords and constructs in Mizar language
    keywords: "environ vocabularies notations constructors definitions registrations theorems schemes requirements begin end definition registration cluster existence pred func defpred deffunc theorem proof let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from be being by means equals implies iff redefine define now not or attr is mode suppose per cases set thesis contradiction scheme reserve struct correctness compatibility coherence symmetry assymetry reflexivity irreflexivity connectedness uniqueness commutativity idempotence involutiveness projectivity",
    // Configure single-line comments in Mizar (start with '::' and go to end of line)
    contains: [
      languageHelpers.COMMENT("::", "$")
    ]
  };
}

module.exports = createMizarLanguageDefinition;