/**
 * Iterates over an array of interaction entries, applying a callback to each entry.
 * The callback receives the accumulator, the current entry, the result of a mapping function on the entry, and the original array.
 * Returns the final accumulator value after processing all entries.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Function} callback - The function to invoke for each entry. Receives (accumulator, entry, mappedValue, entriesArray).
 * @param {Function} mapEntry - Function to map each entry to a value for the callback.
 * @param {*} accumulator - The initial accumulator value, which is updated and returned.
 * @returns {*} The final accumulator value after processing all entries.
 */
function processInteractionEntries(interactionEntries, callback, mapEntry, accumulator) {
  let index = -1;
  const entriesCount = interactionEntries == null ? 0 : interactionEntries.length;

  // Iterate over each interaction entry in the array
  while (++index < entriesCount) {
    const entry = interactionEntries[index];
    // Invoke the callback with the accumulator, current entry, mapped value, and the original array
    callback(accumulator, entry, mapEntry(entry), interactionEntries);
  }

  // Return the final accumulator value
  return accumulator;
}

module.exports = processInteractionEntries;