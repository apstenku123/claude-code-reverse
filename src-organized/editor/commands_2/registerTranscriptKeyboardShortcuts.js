/**
 * Registers keyboard shortcuts for toggling transcript and prompt modes.
 *
 * Listens for specific keyboard events (Ctrl+isWildcardOrX and Ctrl+createDebouncedFunction) and triggers UI state changes accordingly.
 *
 * @param {string} currentView - The current UI view, e.g., 'transcript' or 'prompt'.
 * @param {function(function):void} setView - Function to update the current view state. Accepts a function that receives the previous state and returns the new state.
 * @param {function(function):void} incrementActionCounter - Function to increment an action counter. Accepts a function that receives the previous counter and returns the new value.
 * @param {function(function):void} toggleUiActionTransaction - Function to start or toggle a UI action transaction. Accepts a function that receives the previous state and returns the new state.
 * @param {function():Promise<void>} refreshUi - Async function to refresh the UI or perform side effects after state changes.
 * @returns {void}
 */
function registerTranscriptKeyboardShortcuts(
  currentView,
  setView,
  incrementActionCounter,
  toggleUiActionTransaction,
  refreshUi
) {
  D0(async (pressedKey, event) => {
    // Ctrl+isWildcardOrX: Toggle between 'transcript' and 'prompt' views
    if (event.ctrl && pressedKey === "r") {
      setView(prevView => prevView === "transcript" ? "prompt" : "transcript");
      incrementActionCounter(prevCount => prevCount + 1);
      toggleUiActionTransaction(() => false);
      await refreshUi();
    }
    // Ctrl+createDebouncedFunction: Toggle UI action transaction only if current view is 'transcript'
    if (event.ctrl && pressedKey === "e" && currentView === "transcript") {
      toggleUiActionTransaction(prevState => !prevState);
      incrementActionCounter(prevCount => prevCount + 1);
      await refreshUi();
    }
  });
}

module.exports = registerTranscriptKeyboardShortcuts;