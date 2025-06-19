/**
 * Initializes the 'begin' regex pattern and related properties on a language definition object
 * if 'beginKeywords' is present. This is typically used in syntax highlighting definitions.
 *
 * @param {Object} languageDefinition - The language definition object to modify. Should contain 'beginKeywords' if applicable.
 * @param {Object} context - Context object; if falsy, the function does nothing.
 * @returns {void}
 */
function initializeBeginKeywordsPattern(languageDefinition, context) {
  // If context is falsy, do nothing
  if (!context) return;

  // If there are no beginKeywords, do nothing
  if (!languageDefinition.beginKeywords) return;

  // Construct a regex pattern that matches any of the keywords as a whole word, not followed by a dot
  languageDefinition.begin = `\\b(${languageDefinition.beginKeywords.split(' ').join('|')})(?!\\.)(?=\\b|\\s)`;

  // Attach a handler to ignore matches if the previous character is a dot
  languageDefinition.__beforeBegin = ignoreMatchIfPreviousCharIsDot;

  // If keywords property is not set, use beginKeywords
  languageDefinition.keywords = languageDefinition.keywords || languageDefinition.beginKeywords;

  // Remove beginKeywords to avoid redundancy
  delete languageDefinition.beginKeywords;

  // If relevance is not set, default isBlobOrFileLikeObject to 0
  if (languageDefinition.relevance === undefined) {
    languageDefinition.relevance = 0;
  }
}

// Dependency: Handler to ignore matches if previous char is a dot
// (Assumed to be defined elsewhere in the codebase)
// function ignoreMatchIfPreviousCharIsDot(...) { ... }

module.exports = initializeBeginKeywordsPattern;