/**
 * Iterates over an array of interaction entries, applying a callback to each entry.
 * The callback receives the accumulator, the current entry, the result of a mapping function, and the original array.
 * Returns the final accumulator value after processing all entries.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Function} callback - The function to execute for each entry. Receives (accumulator, entry, mappedValue, entriesArray).
 * @param {Function} mapEntry - Function to map each entry to a value passed to the callback.
 * @param {*} accumulator - The initial accumulator value, which is updated and returned.
 * @returns {*} The final accumulator value after processing all entries.
 */
function processInteractionEntriesWithCallback(interactionEntries, callback, mapEntry, accumulator) {
  const entriesLength = interactionEntries == null ? 0 : interactionEntries.length;
  let currentIndex = 0;

  // Iterate over each interaction entry
  while (currentIndex < entriesLength) {
    const currentEntry = interactionEntries[currentIndex];
    // Apply the callback with the accumulator, current entry, mapped value, and the original array
    callback(accumulator, currentEntry, mapEntry(currentEntry), interactionEntries);
    currentIndex++;
  }

  return accumulator;
}

module.exports = processInteractionEntriesWithCallback;