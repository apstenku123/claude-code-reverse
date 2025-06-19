/**
 * Returns processed interaction entries if provided, otherwise returns a default value.
 *
 * @param {Array|undefined|null} interactionEntries - An array of interaction entries to process, or a falsy value.
 * @returns {any} The result of processing the interaction entries, or the default value if none are provided.
 */
function getProcessedInteractionEntriesOrDefault(interactionEntries) {
  // If interaction entries are provided, process them; otherwise, return the default value
  return interactionEntries ? createAnimationFrameObservable(interactionEntries) : createDebouncedFunction$9;
}

module.exports = getProcessedInteractionEntriesOrDefault;