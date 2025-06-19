/**
 * Factory function that creates a parseFloat utility with configurable precision and scaling.
 * It caches results based on the number of matches of a global RegExp (aV5) in the input string.
 *
 * @param {number} exponentMultiplier - Multiplier for the exponent in the denominator (default: 1).
 * @param {number} decimalPlaces - Number of decimal places to round the result to (default: 3).
 * @returns {{ get: function(string): number, clear: function(): void }}
 *   An object with:
 *     - get(inputString): Returns the computed float value for the input string.
 *     - clear(): Clears the internal cache.
 */
function createParseFloatFactory(exponentMultiplier = 1, decimalPlaces = 3) {
  // Cache to store computed values by match count
  const cache = new Map();
  // Scaling factor for rounding to the specified decimal places
  const scalingFactor = Math.pow(10, decimalPlaces);

  return {
    /**
     * Computes a float value based on the number of matches of aV5 in the input string.
     * Uses caching for efficiency.
     *
     * @param {string} inputString - The string to analyze.
     * @returns {number} - The computed and rounded float value.
     */
    get(inputString) {
      // Count the number of matches of the global RegExp aV5 in the input string
      const matchCount = inputString.match(aV5).length;
      // Return cached value if available
      if (cache.has(matchCount)) {
        return cache.get(matchCount);
      }
      // Compute the value: 1 / (matchCount ^ (0.5 * exponentMultiplier))
      const computedValue = 1 / Math.pow(matchCount, 0.5 * exponentMultiplier);
      // Round to the specified decimal places
      const roundedValue = parseFloat(Math.round(computedValue * scalingFactor) / scalingFactor);
      // Cache the result for future calls
      cache.set(matchCount, roundedValue);
      return roundedValue;
    },
    /**
     * Clears the internal cache.
     */
    clear() {
      cache.clear();
    }
  };
}

module.exports = createParseFloatFactory;