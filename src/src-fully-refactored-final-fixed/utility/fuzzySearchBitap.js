/**
 * Performs a fuzzy search using the Bitap algorithm.
 *
 * @param {string} text - The text in which to search for the pattern.
 * @param {string} pattern - The pattern to search for within the text.
 * @param {Object} patternAlphabet - An object mapping each character in the pattern to a bitmask.
 * @param {Object} [options={}] - Optional configuration for the search.
 * @param {number} [options.location=N4.location] - Expected location of the pattern in the text.
 * @param {number} [options.distance=N4.distance] - Maximum distance for a match to be considered.
 * @param {number} [options.threshold=N4.threshold] - Threshold for match acceptance.
 * @param {boolean} [options.findAllMatches=N4.findAllMatches] - Whether to find all matches or stop at the first.
 * @param {number} [options.minMatchCharLength=N4.minMatchCharLength] - Minimum length of a matching substring.
 * @param {boolean} [options.includeMatches=N4.includeMatches] - Whether to include match indices in the result.
 * @param {boolean} [options.ignoreLocation=N4.ignoreLocation] - Whether to ignore the location when scoring matches.
 * @returns {Object} Result object containing isMatch, score, and optionally indices.
 */
function fuzzySearchBitap(
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
  // Check if pattern length exceeds the maximum allowed length
  if (pattern.length > Dk) {
    throw new Error(getPatternLengthExceededMessage(Dk));
  }

  const patternLength = pattern.length;
  const textLength = text.length;
  const expectedLocation = Math.max(0, Math.min(location, textLength));
  let currentThreshold = threshold;
  let searchStartIndex = expectedLocation;
  const shouldRecordMatches = minMatchCharLength > 1 || includeMatches;
  const matchMask = shouldRecordMatches ? Array(textLength) : [];

  // Exact match search loop
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
      for (let i = 0; i < patternLength; i += 1) {
        matchMask[foundIndex + i] = 1;
      }
    }
  }

  let bestLocation = -1;
  let lastBitArray = [];
  let finalScore = 1;
  let binMax = patternLength + textLength;
  const matchMaskBit = 1 << (patternLength - 1);

  // Bitap algorithm: iterate over allowed errors
  for (let errorCount = 0; errorCount < patternLength; errorCount += 1) {
    let binMin = 0;
    let binMid = binMax;

    // Binary search to determine how far from expectedLocation handleMissingDoctypeError can stray
    while (binMin < binMid) {
      const score = calculateMatchScore(pattern, {
        errors: errorCount,
        currentLocation: expectedLocation + binMid,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }
      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }
    binMax = binMid;

    const start = Math.max(1, expectedLocation - binMid + 1);
    const finish = findAllMatches ? textLength : Math.min(expectedLocation + binMid, textLength) + patternLength;
    const bitArray = Array(finish + 2);
    bitArray[finish + 1] = (1 << errorCount) - 1;

    for (let textIndex = finish; textIndex >= start; textIndex -= 1) {
      const charIndex = textIndex - 1;
      const charMatchMask = patternAlphabet[text.charAt(charIndex)];
      if (shouldRecordMatches) {
        matchMask[charIndex] = +!!charMatchMask;
      }
      // Calculate the bit array for this error count
      bitArray[textIndex] = ((bitArray[textIndex + 1] << 1) | 1) & charMatchMask;
      if (errorCount) {
        bitArray[textIndex] |= ((lastBitArray[textIndex + 1] | lastBitArray[textIndex]) << 1) | 1 | lastBitArray[textIndex + 1];
      }
      // Check if this position is a potential match
      if (bitArray[textIndex] & matchMaskBit) {
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
          // If handleMissingDoctypeError have found a good enough match, break early
          if (bestLocation <= expectedLocation) {
            break;
          }
          // Adjust start for next iteration
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }
    // If the score for the next error count exceeds the threshold, stop
    const nextScore = calculateMatchScore(pattern, {
      errors: errorCount + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });
    if (nextScore > currentThreshold) {
      break;
    }
    lastBitArray = bitArray;
  }

  const result = {
    isMatch: bestLocation >= 0,
    score: Math.max(0.001, finalScore)
  };

  // Optionally include match indices if requested
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

module.exports = fuzzySearchBitap;