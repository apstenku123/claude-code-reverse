/**
 * Applies a regular expression pattern to a language definition object based on its 'beginKeywords' property.
 * Also sets up keyword handling and relevance if not already defined.
 *
 * @param {Object} languageDefinition - The language definition object to modify.
 * @param {Object} context - The parsing context; if falsy, the function does nothing.
 * @returns {void}
 */
function applyBeginKeywordsPattern(languageDefinition, context) {
  // If context is not provided, do nothing
  if (!context) return;

  // If there are no beginKeywords, do nothing
  if (!languageDefinition.beginKeywords) return;

  // Build a regex pattern that matches any of the keywords as a word boundary, not followed by a dot
  languageDefinition.begin = "\\b(" + languageDefinition.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";

  // Assign the function to check for a dot before the match
  languageDefinition.__beforeBegin = ignoreMatchIfPreviousCharIsDot;

  // If keywords are not already set, use beginKeywords
  languageDefinition.keywords = languageDefinition.keywords || languageDefinition.beginKeywords;

  // Remove beginKeywords to avoid redundancy
  delete languageDefinition.beginKeywords;

  // If relevance is not set, default isBlobOrFileLikeObject to 0
  if (languageDefinition.relevance === undefined) {
    languageDefinition.relevance = 0;
  }
}

module.exports = applyBeginKeywordsPattern;