/**
 * Generates a formatted activity identifier string based on provided numeric arguments.
 *
 * If only the primaryId is provided (and is a number), returns a string composed of the global prefix (j5),
 * the incremented primaryId, and the suffix 'extractNestedPropertyOrArray'.
 * If both primaryId and secondaryId are provided (and are numbers), returns a string composed of the global prefix (j5),
 * the incremented secondaryId, the global separator (nn), the incremented primaryId, and the suffix 'H'.
 * Throws a TypeError if primaryId is not a number.
 *
 * @param {number} primaryId - The main numeric identifier for the activity.
 * @param {number} [secondaryId] - An optional secondary numeric identifier for the activity.
 * @returns {string} The formatted activity identifier string.
 * @throws {TypeError} If primaryId is not a number.
 */
function formatActivityIdentifier(primaryId, secondaryId) {
  // Validate that primaryId is a number
  if (typeof primaryId !== "number") {
    throw new TypeError("The `x` argument is required");
  }

  // If secondaryId is not a number, return the simple format
  if (typeof secondaryId !== "number") {
    // j5 is assumed to be a global prefix string
    return j5 + (primaryId + 1) + "extractNestedPropertyOrArray";
  }

  // If both IDs are numbers, return the extended format
  // nn is assumed to be a global separator string
  return j5 + (secondaryId + 1) + nn + (primaryId + 1) + "H";
}

module.exports = formatActivityIdentifier;
