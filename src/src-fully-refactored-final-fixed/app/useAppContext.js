/**
 * Retrieves the current value from the AppContext using React'createInteractionAccessor useContext hook.
 *
 * @returns {any} The current context value provided by AppContextProvider.
 */
function useAppContext() {
  // Access the current value of AppContext using React'createInteractionAccessor useContext hook
  return React.useContext(AppContext);
}

module.exports = useAppContext;