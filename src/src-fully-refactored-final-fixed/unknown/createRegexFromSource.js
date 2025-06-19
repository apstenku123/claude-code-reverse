/**
 * Creates a regular expression object from the provided source and configuration.
 *
 * @param {string} regexSource - The string pattern to be converted into a regular expression.
 * @param {Object} [options={}] - Optional configuration object for the regular expression creation.
 * @returns {RegExp} The resulting regular expression object.
 */
const createRegexFromSource = (regexSource, options = {}) => {
  // Instantiate mJ with the source pattern and options, then call makeRe to get the RegExp
  return new mJ(regexSource, options).makeRe();
};

module.exports = createRegexFromSource;
