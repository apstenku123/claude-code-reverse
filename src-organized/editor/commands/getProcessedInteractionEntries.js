/**
 * Returns a processed version of the interaction entries array, handling special property logic if required.
 *
 * If the input is null or undefined, returns a default value depending on the exact nullish value.
 * If a global property key (G_) exists in the input object, processes the input with property temporarily unset.
 * Otherwise, processes the input with the standard processor.
 *
 * @param {Array|Object|null|undefined} interactionEntries - The array or object of interaction entries to process.
 * @returns {*} The processed interaction entries, or a default value if input is null or undefined.
 */
function getProcessedInteractionEntries(interactionEntries) {
  // Handle null or undefined input by returning the appropriate default
  if (interactionEntries == null) {
    // If undefined, return dr4; if null, return mr4
    return interactionEntries === undefined ? dr4 : mr4;
  }

  // If G_ is defined and present as a property in the input object, use the special property-unsetting processor
  if (G_ && Object(interactionEntries).hasOwnProperty(G_)) {
    return getAndTemporarilyUnsetProperty(interactionEntries);
  }

  // Otherwise, use the standard processor
  return sr4(interactionEntries);
}

module.exports = getProcessedInteractionEntries;