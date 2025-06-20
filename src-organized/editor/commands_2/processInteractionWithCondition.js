/**
 * Processes interaction data based on a condition and applies a transformation.
 *
 * @param {any} interactionData - The main interaction data to process.
 * @param {any} interactionEntries - The entries associated with the interaction.
 * @param {any} condition - An optional condition or key to determine processing logic.
 * @returns {any} The result of processing the interaction data and entries.
 */
function processInteractionWithCondition(interactionData, interactionEntries, condition) {
  // Determine which processor function to use based on the type of interactionData
  const processor = isInteractionTypeTwo(interactionData) ? processTypeThree : processTypeOne;

  // If a condition is provided and the interaction passes the guard, process entries
  if (condition && interactionGuard(interactionData, interactionEntries, condition)) {
    interactionEntries = processInteractionEntries;
  }

  // Transform the entries and process with the selected processor
  return processor(interactionData, transformEntries(interactionEntries, 3));
}

module.exports = processInteractionWithCondition;
