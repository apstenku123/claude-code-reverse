/**
 * Filters an array of tip objects, returning only those that are relevant.
 * Each tip object must implement an asynchronous isRelevant() method.
 *
 * @param {Array<Object>} tips - Array of tip objects to be filtered. Each object must have an async isRelevant() method.
 * @returns {Promise<Array<Object>>} Promise resolving to an array of relevant tip objects.
 */
async function filterRelevantTips(tips) {
  // Evaluate isRelevant for each tip in parallel and pair the result with the tip
  const tipRelevancePairs = await Promise.all(
    tips.map(async (tip) => {
      const isRelevant = await tip.isRelevant();
      return {
        tip,
        isRelevant
      };
    })
  );

  // Filter out tips that are not relevant
  const relevantTips = tipRelevancePairs
    .filter(pair => pair.isRelevant)
    .map(pair => pair.tip);

  return relevantTips;
}

module.exports = filterRelevantTips;