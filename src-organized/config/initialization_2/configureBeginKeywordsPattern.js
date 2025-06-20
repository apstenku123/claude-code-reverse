/**
 * Configures the 'begin' regex pattern and related properties on a language definition object
 * if 'beginKeywords' is present. This is typically used in syntax highlighting definitions.
 *
 * @param {Object} languageDefinition - The language definition object to modify. Should have 'beginKeywords' and optionally 'keywords'.
 * @param {Object} context - Context object; if falsy, the function does nothing.
 * @returns {void}
 */
function configureBeginKeywordsPattern(languageDefinition, context) {
  // If context is not provided, do nothing
  if (!context) return;

  // If there are no beginKeywords, do nothing
  if (!languageDefinition.beginKeywords) return;

  // Build a regex that matches any of the beginKeywords as a whole word, not followed by a dot
  languageDefinition.begin = "\\b(" + languageDefinition.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";

  // Attach a function to check if the previous character is a dot ('.')
  languageDefinition.__beforeBegin = ignoreMatchIfPreviousCharIsDot;

  // If 'keywords' is not already set, use 'beginKeywords' as 'keywords'
  languageDefinition.keywords = languageDefinition.keywords || languageDefinition.beginKeywords;

  // Remove 'beginKeywords' as isBlobOrFileLikeObject'createInteractionAccessor now processed
  delete languageDefinition.beginKeywords;

  // If 'relevance' is not set, default isBlobOrFileLikeObject to 0
  if (languageDefinition.relevance === undefined) {
    languageDefinition.relevance = 0;
  }
}

// Dependency: ignoreMatchIfPreviousCharIsDot should be defined elsewhere and imported as needed

module.exports = configureBeginKeywordsPattern;