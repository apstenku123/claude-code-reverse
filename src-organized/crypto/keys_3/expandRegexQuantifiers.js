/**
 * Expands shorthand quantifiers (* and +) in a regular expression string to explicit quantifier notation using provided limits.
 *
 * Iterates over a Map of regex tokens and their maximum allowed repetitions, replacing occurrences of 'token*' and 'token+' in the input pattern
 * with 'token{0,max}' and 'token{1,max}' respectively.
 *
 * @param {string} regexPattern - The regular expression pattern containing shorthand quantifiers to expand.
 * @returns {string} The regular expression pattern with expanded quantifiers.
 */
function expandRegexQuantifiers(regexPattern) {
  // Iterate over each [token, maxRepetitions] pair in KM6
  for (const [token, maxRepetitions] of KM6) {
    // Replace all occurrences of 'token*' with 'token{0,maxRepetitions}'
    regexPattern = regexPattern
      .split(`${token}*`).join(`${token}{0,${maxRepetitions}}`)
      // Replace all occurrences of 'token+' with 'token{1,maxRepetitions}'
      .split(`${token}+`).join(`${token}{1,${maxRepetitions}}`);
  }
  return regexPattern;
}

module.exports = expandRegexQuantifiers;