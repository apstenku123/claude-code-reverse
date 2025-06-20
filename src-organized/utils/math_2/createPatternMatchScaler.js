/**
 * Factory function that creates a pattern match scaler utility.
 *
 * Given a regular expression, this utility computes a scaled value based on the number of matches
 * found in a string. The scaling formula is: 1 / Math.pow(matchCount, 0.5 * exponent), rounded to a specified precision.
 * Results are cached for each unique match count for efficiency.
 *
 * @param {RegExp} patternRegex - The regular expression used to match patterns in the input string.
 * @param {number} [exponent=1] - The exponent used in the scaling calculation.
 * @param {number} [precision=3] - The number of decimal places to round the result to.
 * @returns {{ get: (input: string) => number, clear: () => void }}
 *   An object with:
 *     - get(input): Returns the scaled value for the number of matches in the input string.
 *     - clear(): Clears the internal cache.
 */
function createPatternMatchScaler(patternRegex, exponent = 1, precision = 3) {
  // Cache to store computed scale values by match count
  const matchCountCache = new Map();
  // Multiplier for rounding to the desired precision
  const roundingFactor = Math.pow(10, precision);

  return {
    /**
     * Computes and returns the scaled value for the number of pattern matches in the input string.
     * Results are cached by match count for efficiency.
     *
     * @param {string} inputString - The string to search for pattern matches.
     * @returns {number} The scaled value based on the number of matches.
     */
    get(inputString) {
      // Count the number of matches for the pattern in the input string
      const matches = inputString.match(patternRegex);
      const matchCount = matches ? matches.length : 0;

      // Return cached value if available
      if (matchCountCache.has(matchCount)) {
        return matchCountCache.get(matchCount);
      }

      // Compute the scaled value using the formula
      // If matchCount is 0, avoid division by zero by returning 0
      let scaledValue;
      if (matchCount === 0) {
        scaledValue = 0;
      } else {
        const scale = 1 / Math.pow(matchCount, 0.5 * exponent);
        // Round to the specified precision
        scaledValue = parseFloat(Math.round(scale * roundingFactor) / roundingFactor);
      }

      // Cache and return the result
      matchCountCache.set(matchCount, scaledValue);
      return scaledValue;
    },

    /**
     * Clears the internal cache of computed scale values.
     */
    clear() {
      matchCountCache.clear();
    }
  };
}

module.exports = createPatternMatchScaler;