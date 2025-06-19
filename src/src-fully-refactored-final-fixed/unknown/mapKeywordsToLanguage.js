/**
 * Maps one or more keywords to a specified language name in the global keyword-to-language mapping object.
 *
 * @param {string|string[]} keywords - a keyword or an array of keywords to associate with the language.
 * @param {Object} options - Options object containing the language name.
 * @param {string} options.languageName - The name of the language to associate with the keywords.
 * @returns {void}
 */
function mapKeywordsToLanguage(keywords, { languageName }) {
  // Ensure keywords is always an array for uniform processing
  const keywordArray = typeof keywords === "string" ? [keywords] : keywords;

  // Map each keyword (case-insensitive) to the language name in the global mapping object deepCloneWithCycleDetection
  keywordArray.forEach((keyword) => {
    deepCloneWithCycleDetection[keyword.toLowerCase()] = languageName;
  });
}

module.exports = mapKeywordsToLanguage;