/**
 * Configures syntax highlighting settings for C and C++ languages.
 *
 * This function retrieves a language configuration object, disables autodetection,
 * and sets up language aliases for C and C++ if they are not already registered.
 *
 * @param {object} highlighter - The syntax highlighter instance with a getLanguage method.
 * @returns {object} The configured language object with updated aliases and autodetect flag.
 */
function configureCLanguageHighlighting(highlighter) {
  // Retrieve the language configuration object for C/C++
  const languageConfig = defineCppHighlighting(highlighter);

  // List of aliases for C language
  const cAliases = ["c", "h"];

  // List of aliases for C++ language
  const cppAliases = [
    "cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"
  ];

  // Disable automatic language detection
  languageConfig.disableAutodetect = true;

  // Reset aliases to an empty array
  languageConfig.aliases = [];

  // If C language is not registered, add its aliases
  if (!highlighter.getLanguage("c")) {
    languageConfig.aliases.push(...cAliases);
  }

  // If C++ language is not registered, add its aliases
  if (!highlighter.getLanguage("cpp")) {
    languageConfig.aliases.push(...cppAliases);
  }

  return languageConfig;
}

module.exports = configureCLanguageHighlighting;