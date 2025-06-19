/**
 * Calculates the Damerau-Levenshtein distance between two strings.
 * This distance metric counts the minimum number of operations (insertions, deletions, substitutions, and transpositions)
 * required to transform one string into another. If the length difference between the two strings is greater than 3,
 * the function returns the length of the longer string as an optimization.
 *
 * @param {string} source - The first string to compare.
 * @param {string} target - The second string to compare.
 * @returns {number} The Damerau-Levenshtein distance between the two strings.
 */
function calculateDamerauLevenshteinDistance(source, target) {
  // Optimization: If the length difference is greater than 3, return the longer length
  if (Math.abs(source.length - target.length) > 3) {
    return Math.max(source.length, target.length);
  }

  // Initialize the distance matrix
  const distanceMatrix = [];
  for (let i = 0; i <= source.length; i++) {
    distanceMatrix[i] = [i];
  }
  for (let j = 0; j <= target.length; j++) {
    distanceMatrix[0][j] = j;
  }

  // Compute distances
  for (let i = 1; i <= source.length; i++) {
    for (let j = 1; j <= target.length; j++) {
      // Cost is 0 if characters match, 1 otherwise
      const substitutionCost = source[i - 1] === target[j - 1] ? 0 : 1;

      // Calculate minimum of deletion, insertion, and substitution
      distanceMatrix[i][j] = Math.min(
        distanceMatrix[i - 1][j] + 1, // Deletion
        distanceMatrix[i][j - 1] + 1, // Insertion
        distanceMatrix[i - 1][j - 1] + substitutionCost // Substitution
      );

      // Check for transposition
      if (
        i > 1 &&
        j > 1 &&
        source[i - 1] === target[j - 2] &&
        source[i - 2] === target[j - 1]
      ) {
        distanceMatrix[i][j] = Math.min(
          distanceMatrix[i][j],
          distanceMatrix[i - 2][j - 2] + 1 // Transposition
        );
      }
    }
  }

  return distanceMatrix[source.length][target.length];
}

module.exports = calculateDamerauLevenshteinDistance;