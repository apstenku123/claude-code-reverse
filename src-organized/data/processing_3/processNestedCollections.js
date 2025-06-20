/**
 * Recursively processes a nested collection, applying a handler to each non-collection item, and sorts the result object.
 *
 * @param {any} collection - The input collection to process. Can be an array or a single item.
 * @param {any} context - Context or additional data to pass to the handler function.
 * @param {Object} result - The result object that accumulates processed items.
 * @returns {void}
 */
function processNestedCollections(collection, context, result) {
  if (collection == null) return;

  // If the collection is an array or iterable, process each element recursively
  if (isIterable(collection)) {
    collection.forEach(function (item) {
      if (item == null) return;
      if (isIterable(item)) {
        // Recursively process nested collections
        processNestedCollections(item, context, result);
      } else {
        // Handle non-collection item
        handleItem(item, context, result);
      }
    });
  } else {
    // Handle non-collection root item
    handleItem(collection, context, result);
  }

  // Sort the result object'createInteractionAccessor entries by key
  const sortedEntries = Object.entries(result).sort();
  Object.assign(result, Object.fromEntries(sortedEntries));
}

module.exports = processNestedCollections;
