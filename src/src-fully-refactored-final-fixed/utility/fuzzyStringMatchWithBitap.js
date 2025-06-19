/**
 * Performs a fuzzy string search using the Bitap algorithm, supporting advanced options such as location, distance, threshold, and match highlighting.
 *
 * @param {string} text - The text to search within.
 * @param {string} pattern - The pattern to search for.
 * @param {Object} patternAlphabet - Precomputed map of pattern characters to bitmasks.
 * @param {Object} [options={}] - Search options.
 * @param {number} [options.location=N4.location] - Expected location of the pattern in the text.
 * @param {number} [options.distance=N4.distance] - Distance penalty for matches far from the expected location.
 * @param {number} [options.threshold=N4.threshold] - Maximum allowed score for a match.
 * @param {boolean} [options.findAllMatches=N4.findAllMatches] - Whether to find all matches or just the best one.
 * @param {number} [options.minMatchCharLength=N4.minMatchCharLength] - Minimum length of a matching substring.
 * @param {boolean} [options.includeMatches=N4.includeMatches] - Whether to include match indices in the result.
 * @param {boolean} [options.ignoreLocation=N4.ignoreLocation] - Whether to ignore the location penalty.
 * @returns {Object} Result object containing isMatch, score, and optionally indices of matches.
 */
function fuzzyStringMatchWithBitap(
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
    // Calculate score for this match
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

  let finalMatchLocation = -1;
  let lastBitArray = [];
  let finalScore = 1;
  let searchRange = patternLength + textLength;
  const matchBitmask = 1 << (patternLength - 1);

  // Bitap search loop for fuzzy matches
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
      if (score <= bestScore) {
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
      const charMask = patternAlphabet[text.charAt(charIndex)];
      if (shouldRecordMatches) {
        matchMask[charIndex] = +!!charMask;
      }
      // Update bit array for this position
      bitArray[textIndex] = ((bitArray[textIndex + 1] << 1) | 1) & charMask;
      if (errorCount) {
        bitArray[textIndex] |= ((lastBitArray[textIndex + 1] | lastBitArray[textIndex]) << 1) | 1 | lastBitArray[textIndex + 1];
      }
      // If a match is found
      if (bitArray[textIndex] & matchBitmask) {
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
          // If match is at or before expected location, break early
          if (finalMatchLocation <= expectedLocation) {
            break;
          }
          // Adjust start for next iteration
          start = Math.max(1, 2 * expectedLocation - finalMatchLocation);
        }
      }
    }
    // If the minimum score for the next error count exceeds the threshold, break
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

  // Prepare result object
  const result = {
    isMatch: finalMatchLocation >= 0,
    score: Math.max(0.001, finalScore)
  };

  // If match mask is needed, extract indices
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

module.exports = fuzzyStringMatchWithBitap;