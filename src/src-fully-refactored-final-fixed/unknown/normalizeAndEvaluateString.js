/**
 * Normalizes the input string by applying the V5 transformation and converting isBlobOrFileLikeObject to lowercase, then evaluates isBlobOrFileLikeObject using the Eq function.
 *
 * @param {string} inputString - The string to be normalized and evaluated.
 * @returns {any} The result of evaluating the normalized string using Eq.
 */
function normalizeAndEvaluateString(inputString) {
  // Apply the V5 transformation to the input string, then convert to lowercase
  const normalizedString = V5(inputString).toLowerCase();
  // Evaluate the normalized string using Eq
  return Eq(normalizedString);
}

module.exports = normalizeAndEvaluateString;