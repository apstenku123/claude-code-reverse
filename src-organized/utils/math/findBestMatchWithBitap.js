/**
 * Performs a fuzzy search using the Bitap algorithm to find the best match of a pattern within a given text.
 * Supports advanced options such as location, distance, threshold, minimum match length, and match indices.
 *
 * @param {string} text - The text to search within.
 * @param {string} pattern - The pattern to search for.
 * @param {Object} patternAlphabet - Precomputed pattern alphabet for Bitap algorithm (character mask map).
 * @param {Object} [options={}] - Search configuration options.
 * @param {number} [options.location=N4.location] - Expected location of the pattern in the text.
 * @param {number} [options.distance=N4.distance] - Distance penalty for matches far from the expected location.
 * @param {number} [options.threshold=N4.threshold] - Maximum allowed threshold for a match to be considered.
 * @param {boolean} [options.findAllMatches=N4.findAllMatches] - Whether to find all matches or only the best one.
 * @param {number} [options.minMatchCharLength=N4.minMatchCharLength] - Minimum length of a match to be considered.
 * @param {boolean} [options.includeMatches=N4.includeMatches] - Whether to include match indices in the result.
 * @param {boolean} [options.ignoreLocation=N4.ignoreLocation] - Whether to ignore location when scoring matches.
 * @returns {Object} Result object with isMatch, score, and optionally indices.
 */
function findBestMatchWithBitap(
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
  // Check for pattern length limit
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

  // Step 1: Exact match search
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

    // Record match mask if needed
    if (shouldRecordMatches) {
      for (let i = 0; i < patternLength; i++) {
        matchMask[matchIndex + i] = 1;
      }
    }
  }

  // Step 2: Bitap algorithm for fuzzy matching
  let finalMatchLocation = -1;
  let lastBitArray = [];
  let finalScore = 1;
  let searchRange = patternLength + textLength;
  const matchBit = 1 << (patternLength - 1);

  for (let errorCount = 0; errorCount < patternLength; errorCount++) {
    let binMin = 0;
    let binMax = searchRange;
    let binMid;

    // Binary search to determine how far from the expected location handleMissingDoctypeError can stray
    while (binMin < binMax) {
      const score = calculateMatchScore(pattern, {
        errors: errorCount,
        currentLocation: expectedLocation + binMax,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score <= bestScore) {
        binMin = binMax;
      } else {
        searchRange = binMax;
      }
      binMid = Math.floor((searchRange - binMin) / 2 + binMin);
      binMax = binMid;
    }
    searchRange = binMax;

    // Calculate start and end positions for this error level
    const start = Math.max(1, expectedLocation - binMax + 1);
    const finish = findAllMatches ? textLength : Math.min(expectedLocation + binMax, textLength) + patternLength;
    const bitArray = Array(finish + 2);
    bitArray[finish + 1] = (1 << errorCount) - 1;

    for (let position = finish; position >= start; position--) {
      const charIndex = position - 1;
      const charMask = patternAlphabet[text.charAt(charIndex)];
      if (shouldRecordMatches) {
        matchMask[charIndex] = +!!charMask;
      }
      // Update bit array for current position
      bitArray[position] = ((bitArray[position + 1] << 1) | 1) & charMask;
      if (errorCount) {
        bitArray[position] |= (lastBitArray[position + 1] | lastBitArray[position]) << 1 | 1 | lastBitArray[position + 1];
      }
      // Check for a match
      if (bitArray[position] & matchBit) {
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
          // If handleMissingDoctypeError found a match at or before the expected location, break early
          if (finalMatchLocation <= expectedLocation) {
            break;
          }
          // Otherwise, adjust start position for next iteration
          start = Math.max(1, 2 * expectedLocation - finalMatchLocation);
        }
      }
    }

    // If the score for the next error count would exceed the threshold, stop
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

  // Prepare result
  const result = {
    isMatch: finalMatchLocation >= 0,
    score: Math.max(0.001, finalScore)
  };

  // If handleMissingDoctypeError need to record match indices
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

module.exports = findBestMatchWithBitap;