/**
 * Processes a variable number of interaction entry arguments by forwarding them as an array
 * to the processInteractionEntries function (composeFunctions).
 *
 * @param {...any} interactionEntries - a variable number of interaction entry arguments to process.
 * @returns {any} The result of processing the interaction entries via composeFunctions.
 */
function processInteractionEntriesWrapper(...interactionEntries) {
  // Forward all provided arguments as an array to composeFunctions(processInteractionEntries)
  return composeFunctions(interactionEntries);
}

module.exports = processInteractionEntriesWrapper;