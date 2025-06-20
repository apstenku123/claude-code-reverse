/**
 * Applies a series of non-overlapping edits to a source array/string in reverse order.
 * Each edit is defined by an object with 'offset' and 'length' properties.
 * Edits are sorted by offset (and length as a tiebreaker) before being applied.
 * Throws an error if any edits overlap.
 *
 * @param {Array|String} source - The original array or string to be edited.
 * @param {Array<Object>} edits - Array of edit objects, each with 'offset' and 'length'.
 * @returns {Array|String} The edited array or string after all edits have been applied.
 * @throws {Error} If any edits overlap.
 */
function applyNonOverlappingEdits(source, edits) {
  // Clone and sort the edits by offset ascending, then by length ascending for tie-breakers
  const sortedEdits = edits.slice(0).sort((editA, editB) => {
    const offsetDifference = editA.offset - editB.offset;
    if (offsetDifference === 0) {
      // If offsets are equal, sort by length
      return editA.length - editB.length;
    }
    return offsetDifference;
  });

  let currentEnd = source.length;

  // Apply edits in reverse order to avoid affecting subsequent offsets
  for (let i = sortedEdits.length - 1; i >= 0; i--) {
    const edit = sortedEdits[i];
    // Ensure the edit does not overlap with previous edits
    if (edit.offset + edit.length <= currentEnd) {
      // Apply the edit using the external I81 function
      source = I81(source, edit);
    } else {
      throw new Error("Overlapping edit");
    }
    // Update the end boundary for the next edit
    currentEnd = edit.offset;
  }

  return source;
}

module.exports = applyNonOverlappingEdits;