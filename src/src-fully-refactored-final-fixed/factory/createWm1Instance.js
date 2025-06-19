/**
 * Factory function to create a new wm1 instance using the provided interaction entries.
 *
 * @param {Array} interactionEntries - An array of interaction entries to be processed.
 * @returns {wm1} a new instance of wm1 initialized with the processed interaction entries.
 */
function createWm1Instance(interactionEntries) {
  // Create and return a new wm1 instance, passing in the interaction entries
  return new wm1(interactionEntries);
}

module.exports = createWm1Instance;