/**
 * Filters an array of items asynchronously, returning only those for which isRelevant() resolves to true.
 *
 * @async
 * @function filterRelevantItems
 * @param {Array<Object>} items - An array of objects, each expected to have an asynchronous isRelevant() method.
 * @returns {Promise<Array<Object>>} a promise that resolves to an array of items that are relevant.
 */
async function filterRelevantItems(items) {
  // Map each item to a promise resolving to an object with the item and its relevance
  const relevanceResults = await Promise.all(
    items.map(async (item) => {
      const isRelevant = await item.isRelevant();
      return {
        item,
        isRelevant
      };
    })
  );

  // Filter to only relevant items and extract the original item
  return relevanceResults
    .filter(result => result.isRelevant)
    .map(result => result.item);
}

module.exports = filterRelevantItems;