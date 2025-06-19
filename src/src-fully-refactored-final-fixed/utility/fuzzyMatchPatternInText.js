/**
 * Performs a fuzzy search to find approximate matches of a pattern within a given text.
 * Utilizes a bitap-based algorithm with configurable options for location, distance, threshold, etc.
 *
 * @param {string} text - The text in which to search for the pattern.
 * @param {string} pattern - The pattern to search for.
 * @param {Object} patternAlphabet - a precomputed map of pattern characters to bit masks.
 * @param {Object} [options={}] - Search configuration options.
 * @param {number} [options.location=N4.location] - Expected location of the pattern in the text.
 * @param {number} [options.distance=N4.distance] - Maximum distance for a match to be considered.
 * @param {number} [options.threshold=N4.threshold] - Threshold for match acceptance (lower is stricter).
 * @param {boolean} [options.findAllMatches=N4.findAllMatches] - Whether to find all matches or stop at the first best match.
 * @param {number} [options.minMatchCharLength=N4.minMatchCharLength] - Minimum length of a matching substring.
 * @param {boolean} [options.includeMatches=N4.includeMatches] - Whether to include match indices in the result.
 * @param {boolean} [options.ignoreLocation=N4.ignoreLocation] - Whether to ignore the location when scoring matches.
 * @returns {Object} Result object with isMatch, score, and optionally indices.
 * @throws {Error} If the pattern length exceeds the allowed maximum.
 */
function fuzzyMatchPatternInText(
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
  if (pattern.length > Dk) {
    throw new Error(getPatternLengthExceededMessage(Dk));
  }

  const patternLength = pattern.length;
  const textLength = text.length;
  const expectedLocation = Math.max(0, Math.min(location, textLength));
  let bestScore = threshold;
  let currentLocation = expectedLocation;
  const shouldRecordMatches = minMatchCharLength > 1 || includeMatches;
  const matchMask = shouldRecordMatches ? Array(textLength) : [];

  // Exact match search loop
  let matchIndex;
  while ((matchIndex = text.indexOf(pattern, currentLocation)) > -1) {
    // Score this match
    const score = calculateMatchScore(pattern, {
      currentLocation: matchIndex,
      expectedLocation,
      distance,
      ignoreLocation
    });
    bestScore = Math.min(score, bestScore);
    currentLocation = matchIndex + patternLength;

    // Mark matched characters if needed
    if (shouldRecordMatches) {
      for (let i = 0; i < patternLength; i++) {
        matchMask[matchIndex + i] = 1;
      }
    }
  }

  // Bitap algorithm for approximate matches
  let finalMatchLocation = -1;
  let lastBitArray = [];
  let finalScore = 1;
  let searchRange = patternLength + textLength;
  const matchBitMask = 1 << (patternLength - 1);

  for (let errorCount = 0; errorCount < patternLength; errorCount++) {
    let minBound = 0;
    let maxBound = searchRange;
    // Binary search to determine search window size
    while (minBound < maxBound) {
      const midBound = Math.floor((maxBound - minBound) / 2 + minBound);
      const score = calculateMatchScore(pattern, {
        errors: errorCount,
        currentLocation: expectedLocation + midBound,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score <= bestScore) {
        minBound = midBound;
      } else {
        maxBound = midBound;
      }
    }
    searchRange = maxBound;

    const start = Math.max(1, expectedLocation - maxBound + 1);
    const finish = findAllMatches ? textLength : Math.min(expectedLocation + maxBound, textLength) + patternLength;
    const bitArray = Array(finish + 2);
    bitArray[finish + 1] = (1 << errorCount) - 1;

    for (let textIndex = finish; textIndex >= start; textIndex--) {
      const charIndex = textIndex - 1;
      const charMask = patternAlphabet[text.charAt(charIndex)];
      if (shouldRecordMatches) {
        matchMask[charIndex] = +!!charMask;
      }
      // Update bit array for current error count
      bitArray[textIndex] = ((bitArray[textIndex + 1] << 1) | 1) & charMask;
      if (errorCount) {
        bitArray[textIndex] |= (lastBitArray[textIndex + 1] | lastBitArray[textIndex]) << 1 | 1 | lastBitArray[textIndex + 1];
      }
      // Check for a match
      if (bitArray[textIndex] & matchBitMask) {
        const score = calculateMatchScore(pattern, {
          errors: errorCount,
          currentLocation: charIndex,
          expectedLocation,
          distance,
          ignoreLocation
        });
        if (score <= bestScore) {
          bestScore = score;
          finalMatchLocation = charIndex;
          finalScore = score;
          // If match is at or before the expected location, break early
          if (finalMatchLocation <= expectedLocation) {
            break;
          }
          // Adjust start position for next iteration
          start = Math.max(1, 2 * expectedLocation - finalMatchLocation);
        }
      }
    }
    // If the minimum score for the next error count is worse than the best, stop
    const nextScore = calculateMatchScore(pattern, {
      errors: errorCount + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });
    if (nextScore > bestScore) {
      break;
    }
    lastBitArray = bitArray;
  }

  const result = {
    isMatch: finalMatchLocation >= 0,
    score: Math.max(0.001, finalScore)
  };

  // Optionally include match indices
  if (shouldRecordMatches) {
    const matchedIndices = findConsecutiveTrueRanges(matchMask, minMatchCharLength);
    if (!matchedIndices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = matchedIndices;
    }
  }

  return result;
}

module.exports = fuzzyMatchPatternInText;