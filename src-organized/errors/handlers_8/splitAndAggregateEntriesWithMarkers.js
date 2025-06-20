/**
 * Splits and aggregates entries from the input array into the output array, respecting a maximum aggregate value per chunk.
 * Handles special marker sequences to control aggregation boundaries.
 *
 * @param {string[]} outputChunks - The array to accumulate aggregated string chunks. The last element is updated or new elements are pushed as needed.
 * @param {string[]} inputEntries - The array of string entries to process and aggregate.
 * @param {number} maxChunkValue - The maximum allowed aggregate value (as computed by getDisplayWidth) per chunk.
 * @returns {void}
 */
function splitAndAggregateEntriesWithMarkers(outputChunks, inputEntries, maxChunkValue) {
  // Clone the inputEntries array to avoid mutating the original
  const entries = [...inputEntries];

  // Marker flags
  let isInMarkerSequence = false;
  let isInSpecialSequence = false;

  // Aggregate value of the current chunk
  let currentChunkValue = getDisplayWidth(removeSpecialPatternFromString(outputChunks.at(-1)));

  // Iterate over each entry and its index
  for (const [entryIndex, entry] of entries.entries()) {
    const entryValue = getDisplayWidth(entry);

    // If adding this entry does not exceed the max, append to last chunk
    if (currentChunkValue + entryValue <= maxChunkValue) {
      outputChunks[outputChunks.length - 1] += entry;
    } else {
      // Otherwise, start a new chunk
      outputChunks.push(entry);
      currentChunkValue = 0;
    }

    // Check for special marker sequence
    if (e71.has(entry)) {
      isInMarkerSequence = true;
      // Check if the next t71.length entries match t71
      isInSpecialSequence = entries.slice(entryIndex + 1, entryIndex + 1 + t71.length).join("") === t71;
    }

    if (isInMarkerSequence) {
      if (isInSpecialSequence) {
        // If in special sequence, end marker on ty1
        if (entry === ty1) {
          isInMarkerSequence = false;
          isInSpecialSequence = false;
        }
      } else if (entry === iQ0) {
        // Otherwise, end marker on iQ0
        isInMarkerSequence = false;
      }
      // Skip further aggregation for this entry
      continue;
    }

    // Update aggregate value for the current chunk
    currentChunkValue += entryValue;

    // If chunk is exactly full and not at the last entry, start a new chunk
    if (currentChunkValue === maxChunkValue && entryIndex < entries.length - 1) {
      outputChunks.push("");
      currentChunkValue = 0;
    }
  }

  // If the last chunk is empty and the previous chunk is non-empty, merge them
  if (
    !currentChunkValue &&
    outputChunks.at(-1).length > 0 &&
    outputChunks.length > 1
  ) {
    outputChunks[outputChunks.length - 2] += outputChunks.pop();
  }
}

module.exports = splitAndAggregateEntriesWithMarkers;