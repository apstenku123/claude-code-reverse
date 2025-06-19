/**
 * Recursively processes a collection (array or single item), applying a handler function to each non-collection item,
 * and sorts the entries of the accumulator object by key at the end.
 *
 * @param {any} collection - The input collection (can be an array or single item) to process.
 * @param {any} context - Context or additional data to pass to the handler function.
 * @param {Object} accumulator - An object used to accumulate results, which will be sorted by key at the end.
 * @returns {void}
 */
function processNestedCollection(collection, context, accumulator) {
  if (collection == null) return;

  // If the collection is an array-like structure, process each element
  if (arraySome(collection)) {
    collection.forEach(function (item) {
      if (item == null) return;
      // Recursively process nested arrays
      if (arraySome(item)) {
        processNestedCollection(item, context, accumulator);
      } else {
        // Process single item
        i8(item, context, accumulator);
      }
    });
  } else {
    // Process single item if not an array
    i8(collection, context, accumulator);
  }

  // Sort the accumulator object'createInteractionAccessor entries by key
  // Note: This reassigns 'accumulator' locally, but does not affect the original reference outside this function
  accumulator = Object.fromEntries(Object.entries(accumulator).sort());
}

module.exports = processNestedCollection;