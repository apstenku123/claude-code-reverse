/**
 * Performs a fuzzy string match between a pattern and a text using a Bitap-like algorithm.
 * Returns match status, score, and optionally match indices.
 *
 * @param {string} text - The text to search within.
 * @param {string} pattern - The pattern to search for.
 * @param {Object} patternAlphabet - Map of pattern characters to bitmasks for Bitap algorithm.
 * @param {Object} [options={}] - Optional configuration for the search.
 * @param {number} [options.location=N4.location] - Expected location of the match in the text.
 * @param {number} [options.distance=N4.distance] - Distance penalty for matches far from the expected location.
 * @param {number} [options.threshold=N4.threshold] - Maximum allowed score threshold for a match.
 * @param {boolean} [options.findAllMatches=N4.findAllMatches] - Whether to find all matches or just the best one.
 * @param {number} [options.minMatchCharLength=N4.minMatchCharLength] - Minimum length of a matching substring.
 * @param {boolean} [options.includeMatches=N4.includeMatches] - Whether to include match indices in the result.
 * @param {boolean} [options.ignoreLocation=N4.ignoreLocation] - Whether to ignore location when scoring matches.
 * @returns {Object} Result object with isMatch, score, and optionally indices.
 */
function fuzzyStringMatch(
  text,
  pattern,
  patternAlphabet,
  {
    location = N4.location,
    distance = N4.distance,
    threshold = N4.threshold,
    findAllMatches = N4.findAllMatches,
    minMatchCharLength = N4.minMatchCharLength,
    includeMatches = N4.includeMatches,
    ignoreLocation = N4.ignoreLocation
  } = {}
) {
  // Validate pattern length
  if (pattern.length > Dk) throw new Error(getPatternLengthExceededMessage(Dk));

  const patternLength = pattern.length;
  const textLength = text.length;
  const expectedLocation = Math.max(0, Math.min(location, textLength));
  let currentThreshold = threshold;
  let searchStartIndex = expectedLocation;
  const shouldRecordMatches = minMatchCharLength > 1 || includeMatches;
  const matchMask = shouldRecordMatches ? Array(textLength) : [];

  // Exact match phase: look for direct substring matches
  let foundIndex;
  while ((foundIndex = text.indexOf(pattern, searchStartIndex)) > -1) {
    // Score this match
    const matchScore = calculateMatchScore(pattern, {
      currentLocation: foundIndex,
      expectedLocation,
      distance,
      ignoreLocation
    });
    currentThreshold = Math.min(matchScore, currentThreshold);
    searchStartIndex = foundIndex + patternLength;
    // Mark matched characters if needed
    if (shouldRecordMatches) {
      for (let i = 0; i < patternLength; i++) {
        matchMask[foundIndex + i] = 1;
      }
    }
  }

  // Bitap algorithm phase
  let bestLocation = -1;
  let lastBitArray = [];
  let bestScore = 1;
  let searchRange = patternLength + textLength;
  const matchBitmask = 1 << (patternLength - 1);

  for (let errorCount = 0; errorCount < patternLength; errorCount++) {
    let minBound = 0;
    let maxBound = searchRange;
    // Binary search to find the best search range for this error count
    while (minBound < maxBound) {
      const mid = Math.floor((maxBound - minBound) / 2 + minBound);
      const score = calculateMatchScore(pattern, {
        errors: errorCount,
        currentLocation: expectedLocation + mid,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score <= currentThreshold) {
        minBound = mid;
      } else {
        maxBound = mid;
      }
    }
    searchRange = maxBound;
    const start = Math.max(1, expectedLocation - maxBound + 1);
    const finish = findAllMatches ? textLength : Math.min(expectedLocation + maxBound, textLength) + patternLength;
    const bitArray = Array(finish + 2);
    bitArray[finish + 1] = (1 << errorCount) - 1;

    for (let textIndex = finish; textIndex >= start; textIndex--) {
      const charIndex = textIndex - 1;
      const charMatchMask = patternAlphabet[text.charAt(charIndex)];
      if (shouldRecordMatches) matchMask[charIndex] = +!!charMatchMask;
      // Update bit array for this position
      bitArray[textIndex] = ((bitArray[textIndex + 1] << 1) | 1) & charMatchMask;
      if (errorCount) {
        bitArray[textIndex] |= ((lastBitArray[textIndex + 1] | lastBitArray[textIndex]) << 1) | 1 | lastBitArray[textIndex + 1];
      }
      // Check for a match
      if (bitArray[textIndex] & matchBitmask) {
        const score = calculateMatchScore(pattern, {
          errors: errorCount,
          currentLocation: charIndex,
          expectedLocation,
          distance,
          ignoreLocation
        });
        if (score <= currentThreshold) {
          currentThreshold = score;
          bestLocation = charIndex;
          if (bestLocation <= expectedLocation) break;
          // Adjust start for next iteration
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }
    // If the score for the next error count would exceed threshold, break
    const nextScore = calculateMatchScore(pattern, {
      errors: errorCount + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });
    if (nextScore > currentThreshold) break;
    lastBitArray = bitArray;
  }

  // Prepare result
  const result = {
    isMatch: bestLocation >= 0,
    score: Math.max(0.001, bestScore)
  };

  // Optionally include match indices
  if (shouldRecordMatches) {
    const matchIndices = findConsecutiveTrueRanges(matchMask, minMatchCharLength);
    if (!matchIndices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = matchIndices;
    }
  }

  return result;
}

module.exports = fuzzyStringMatch;