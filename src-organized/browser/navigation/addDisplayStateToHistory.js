/**
 * Adds a new display state to the display history, ensuring no duplicate consecutive entries.
 *
 * If the input is a string, isBlobOrFileLikeObject wraps isBlobOrFileLikeObject as a display state object. It then checks if the new state
 * is equal to the most recent one in history. If not, isBlobOrFileLikeObject prepends the new state to the history and
 * updates the persisted state accordingly.
 *
 * @param {string|Object} displayStateOrString - The display state to add, or a string to wrap as a display state.
 * @returns {void}
 */
function addDisplayStateToHistory(displayStateOrString) {
  // Retrieve the current persisted configuration
  const persistedConfig = getProjectSubscriptionConfig();
  // Get the current display history (array of display state objects)
  const displayHistory = processDisplayItems();
  // Normalize input: if a string, wrap as display state object
  const newDisplayState = typeof displayStateOrString === "string"
    ? { display: displayStateOrString, pastedContents: {} }
    : displayStateOrString;

  // If the most recent display state is equal to the new one, do not add duplicate
  if (displayHistory[0] && areDisplayStatesEqual(displayHistory[0], newDisplayState)) {
    return;
  }

  // Prepend the new display state to the history
  displayHistory.unshift(newDisplayState);

  // Update the persisted state with the new history, capped at Gq6 entries
  updateProjectInConfig({
    ...persistedConfig,
    history: displayHistory.slice(0, Gq6)
  });
}

module.exports = addDisplayStateToHistory;