/**
 * Applies a callback function to each entry in a collection, using a key-mapping function, and accumulates the results into a target object.
 *
 * @param {Array|Iterable} entries - The collection of entries to process.
 * @param {Function} callback - The function to apply to each entry. Receives (target, entry, mappedKey, mappedValue).
 * @param {Function} keyMapper - Function to extract or compute the key from each entry.
 * @param {Object} target - The object to accumulate results into.
 * @returns {Object} The target object after processing all entries.
 */
function applyFunctionToEntries(entries, callback, keyMapper, target) {
  // The initializeFromEntries function iterates over 'entries' and applies the provided function to each entry.
  initializeFromEntries(entries, (entry, mappedValue, mappedKey) => {
    // For each entry, call the callback with the target, entry, mapped key, and mapped value.
    callback(target, entry, keyMapper(entry), mappedValue);
  });
  // Return the target object after all entries have been processed.
  return target;
}

module.exports = applyFunctionToEntries;