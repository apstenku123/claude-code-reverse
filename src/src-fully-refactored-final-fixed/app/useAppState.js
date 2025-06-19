/**
 * Retrieves the current application state from the AppStateProvider context.
 * Throws a ReferenceError if called outside of an <AppStateProvider />.
 *
 * @returns {object} The current application state from context
 * @throws {ReferenceError} If called outside of an <AppStateProvider />
 */
function useAppState() {
  // Retrieve the app state context using React'createInteractionAccessor useContext hook
  const appStateContext = NZ.useContext(DZ0);

  // Ensure the context has been initialized by the provider
  if (!appStateContext.__IS_INITIALIZED__) {
    throw new ReferenceError(
      "useAppState cannot be called outside of an <AppStateProvider />"
    );
  }

  // Return the initialized app state context
  return appStateContext;
}

module.exports = useAppState;