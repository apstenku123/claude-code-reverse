/**
 * Provides application state context to child components, managing current and previous state,
 * and notifying when the state changes. Prevents nesting of multiple AppStateProviders.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Child components to receive the app state context.
 * @param {any} props.initialState - The initial state value for the application state context.
 * @param {function} [props.onChangeAppState] - Optional callback invoked when the app state changes,
 *   receiving an object with newState and oldState properties.
 * @returns {React.ReactElement} The provider component wrapping its children.
 */
function AppStateProvider({
  children,
  initialState,
  onChangeAppState
}) {
  // Prevent nesting of AppStateProvider
  if (NZ.useContext(ZZ0)) {
    throw new Error("AppStateProvider can not be nested within another AppStateProvider");
  }

  // State holds current and previous state
  const [appState, setAppState] = NZ.useState({
    currentState: initialState ?? bx4(), // Use initialState or fallback to bx4()
    previousState: null
  });

  // Memoized state updater that tracks previous state
  const updateAppState = NZ.useCallback(
    (getNextState) =>
      setAppState(({ currentState }) => ({
        currentState: getNextState(currentState),
        previousState: currentState
      })),
    []
  );

  // Memoize the value provided to context consumers
  const contextValue = NZ.useMemo(() => {
    const value = [appState.currentState, updateAppState];
    value.__IS_INITIALIZED__ = true; // Mark as initialized
    return value;
  }, [appState.currentState, updateAppState]);

  // Notify when app state changes
  NZ.useEffect(() => {
    if (onChangeAppState) {
      onChangeAppState({
        newState: appState.currentState,
        oldState: appState.previousState
      });
    }
  }, [onChangeAppState, appState]);

  // Provide context to children
  return NZ.default.createElement(
    ZZ0.Provider,
    { value: true },
    NZ.default.createElement(
      DZ0.Provider,
      { value: contextValue },
      children
    )
  );
}

module.exports = AppStateProvider;