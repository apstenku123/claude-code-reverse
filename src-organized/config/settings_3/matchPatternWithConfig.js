/**
 * Attempts to match a pattern against a configuration string, with optional settings.
 * If the configuration string starts with a comment character ('#') and comments are not disabled,
 * the function returns false. Otherwise, isBlobOrFileLikeObject creates a matcher and attempts to match the pattern.
 *
 * @param {string} pattern - The pattern or observable to match against.
 * @param {string} configString - The configuration string to be matched.
 * @param {Object} [options={}] - Optional settings for matching. If options.nocomment is true, comment lines are not skipped.
 * @returns {any} - Returns the result of the match operation, or false if the line is a comment and comments are not disabled.
 */
function matchPatternWithConfig(pattern, configString, options = {}) {
  // Perform any necessary pre-processing on the config string
  validatePatternString(configString);

  // If comments are not disabled and the config string starts with '#', skip this line
  if (!options.nocomment && configString.charAt(0) === "#") {
    return false;
  }

  // Create a matcher instance and attempt to match the pattern
  return new mJ(configString, options).match(pattern);
}

module.exports = matchPatternWithConfig;