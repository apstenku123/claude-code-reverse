/**
 * Iterates over each entry in a collection and applies a callback function.
 *
 * @param {Array|Object} collection - The collection to iterate over (array or object).
 * @param {Function} callback - The function to call for each entry. Receives (accumulator, key, value, index).
 * @param {Function} getValue - Function to extract the value for a given key from the collection.
 * @param {any} accumulator - The accumulator object passed to the callback for collecting results.
 * @returns {any} The accumulator after all entries have been processed.
 */
function forEachEntryInCollection(collection, callback, getValue, accumulator) {
  // initializeFromEntries is assumed to be a utility that iterates over the collection,
  // calling the provided function for each key in the collection.
  initializeFromEntries(collection, function (key, index, extra) {
    // For each key, call the callback with accumulator, key, value, and extra info.
    callback(accumulator, key, getValue(key), extra);
  });
  // Return the accumulator after processing all entries.
  return accumulator;
}

module.exports = forEachEntryInCollection;