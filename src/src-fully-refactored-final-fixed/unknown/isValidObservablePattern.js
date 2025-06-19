/**
 * Checks if the provided string matches a specific observable pattern.
 * The function tests the input against several regular expressions and performs
 * additional validation based on the number of matches for certain patterns.
 *
 * @param {string} observableString - The string to validate as an observable pattern.
 * @returns {boolean} True if the string matches the expected observable pattern, false otherwise.
 */
function isValidObservablePattern(observableString) {
  // If the string matches the known valid observable pattern, return true
  if (kJ5.test(observableString)) return true;
  // If the string matches an alternative valid observable pattern, return true
  if (xJ5.test(observableString)) return true;
  // If the string does not match the required base pattern, return false
  if (!Vq2.test(observableString)) return false;
  // If the string does not match the required variant pattern, return false
  if (!vJ5.test(observableString)) return false;

  // Extract all matches for the configuration pattern
  const configMatches = observableString.match(Kq2);
  // Extract all matches for the subscription pattern
  const subscriptionMatches = observableString.match(Hq2);

  // The string is valid if there are subscription matches and
  // twice the number of subscription matches equals the number of config matches
  return subscriptionMatches !== null && 2 * subscriptionMatches.length === configMatches.length;
}

module.exports = isValidObservablePattern;