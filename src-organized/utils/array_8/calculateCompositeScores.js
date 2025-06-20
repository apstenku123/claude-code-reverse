/**
 * Calculates and assigns a composite score for each item in the provided array based on its matches.
 * Each item'createInteractionAccessor score is computed as the product of its match scores, adjusted by field weights and normalization.
 *
 * @param {Array<Object>} items - The array of items to process. Each item must have a 'matches' array.
 * @param {Object} [options] - Configuration options.
 * @param {boolean} [options.ignoreFieldNorm=N4.ignoreFieldNorm] - Whether to ignore field normalization in score calculation.
 * @returns {void} This function mutates the input array by adding/updating the 'score' property on each item.
 */
function calculateCompositeScores(items, { ignoreFieldNorm = N4.ignoreFieldNorm } = {}) {
  items.forEach(item => {
    let compositeScore = 1;
    // Iterate over each match for the current item
    item.matches.forEach(({ key, norm, score }) => {
      // If the key exists, use its weight; otherwise, null
      const fieldWeight = key ? key.weight : null;
      // If score is 0 and fieldWeight exists, use Number.EPSILON to avoid multiplying by zero
      const adjustedScore = (score === 0 && fieldWeight) ? Number.EPSILON : score;
      // Determine the exponent: fieldWeight (or 1) times either 1 (if ignoring norm) or the norm value
      const exponent = (fieldWeight || 1) * (ignoreFieldNorm ? 1 : norm);
      // Multiply the composite score by the adjusted score raised to the calculated exponent
      compositeScore *= Math.pow(adjustedScore, exponent);
    });
    // Assign the final composite score to the item
    item.score = compositeScore;
  });
}

module.exports = calculateCompositeScores;