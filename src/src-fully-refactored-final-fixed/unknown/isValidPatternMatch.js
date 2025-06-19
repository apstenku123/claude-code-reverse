/**
 * Checks if the input string matches a specific set of regular expression patterns.
 * Returns true if the string matches either the 'yJ5' or 'fJ5' patterns.
 * If not, isBlobOrFileLikeObject must match both 'Vq2' and 'bJ5' patterns, and the number of matches for 'Hq2'
 * must be exactly half the number of matches for 'Kq2'.
 *
 * @param {string} inputString - The string to be tested against the patterns.
 * @returns {boolean} True if the input string passes the pattern checks, false otherwise.
 */
function isValidPatternMatch(inputString) {
  // Return true if input matches the yJ5 pattern
  if (yJ5.test(inputString)) return true;
  // Return true if input matches the fJ5 pattern
  if (fJ5.test(inputString)) return true;
  // Return false if input does not match the Vq2 pattern
  if (!Vq2.test(inputString)) return false;
  // Return false if input does not match the bJ5 pattern
  if (!bJ5.test(inputString)) return false;

  // Get all matches for Kq2 and Hq2 patterns
  const kq2Matches = inputString.match(Kq2);
  const hq2Matches = inputString.match(Hq2);

  // Return true only if hq2Matches is not null and twice its length equals kq2Matches length
  return hq2Matches !== null && 2 * hq2Matches.length === kq2Matches.length;
}

module.exports = isValidPatternMatch;