/**
 * Updates the global N9 object'createInteractionAccessor totalLinesAdded and totalLinesRemoved counters.
 *
 * @param {number} linesAdded - The number of lines added to increment the totalLinesAdded counter.
 * @param {number} linesRemoved - The number of lines removed to increment the totalLinesRemoved counter.
 * @returns {void}
 */
function updateTotalLinesChanged(linesAdded, linesRemoved) {
  // Increment the totalLinesAdded property by the specified amount
  N9.totalLinesAdded += linesAdded;
  // Increment the totalLinesRemoved property by the specified amount
  N9.totalLinesRemoved += linesRemoved;
}

module.exports = updateTotalLinesChanged;