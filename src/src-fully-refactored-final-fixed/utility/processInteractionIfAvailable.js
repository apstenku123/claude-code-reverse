/**
 * Processes interaction entries if the source observable is provided.
 *
 * @param {Array} interactionEntries - An array of interaction entries to process.
 * @param {Object} config - Configuration object for processing interactions.
 * @returns {*} The result of the I21 function if interactionEntries is provided; otherwise, returns undefined.
 */
function processInteractionIfAvailable(interactionEntries, config) {
  // Only process if interactionEntries is provided (not null/undefined/false)
  if (!interactionEntries) {
    return undefined;
  }
  // I21 is an external function that processes the entries with the given config and _J
  return I21(interactionEntries, config, _J);
}

module.exports = processInteractionIfAvailable;