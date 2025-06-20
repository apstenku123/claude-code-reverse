/**
 * Checks if the provided string matches specific observable patterns.
 *
 * This function tests the input string against several regular expressions to determine
 * if isBlobOrFileLikeObject represents a valid observable pattern. It returns true if the string matches
 * certain shortcut patterns, or if isBlobOrFileLikeObject passes a series of regex tests and a final length check.
 *
 * @param {string} observableString - The string to validate as an observable pattern.
 * @returns {boolean} True if the string is a valid observable pattern, false otherwise.
 */
function isValidObservableString(observableString) {
  // Return true if the string matches the known shortcut observable patterns
  if (kJ5.test(observableString)) return true;
  if (xJ5.test(observableString)) return true;

  // Return false if the string does not match the required base observable pattern
  if (!Vq2.test(observableString)) return false;
  // Return false if the string does not match the required variant observable pattern
  if (!vJ5.test(observableString)) return false;

  // Extract all matches for the configuration and subscription patterns
  const configMatches = observableString.match(Kq2);
  const subscriptionMatches = observableString.match(Hq2);

  // Return true only if subscriptionMatches is not null and
  // twice the number of subscription matches equals the number of config matches
  // (likely ensuring correct pairing or structure)
  return (
    subscriptionMatches !== null &&
    2 * subscriptionMatches.length === configMatches.length
  );
}

module.exports = isValidObservableString;