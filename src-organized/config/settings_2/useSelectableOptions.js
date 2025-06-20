/**
 * Manages the state and behavior for a selectable options list (e.g., dropdown or listbox).
 * Handles option focus, selection, visible window, and notifies parent on changes or cancellation.
 *
 * @param {Object} params - The configuration object.
 * @param {number} [params.visibleOptionCount=5] - Number of options visible at once.
 * @param {Array<Object>} params.options - The full list of selectable options.
 * @param {any} params.defaultValue - The default selected value.
 * @param {function} params.onChange - Callback when selection changes.
 * @param {function} params.onCancel - Callback when selection is cancelled.
 * @param {function} params.onFocus - Callback when an option is focused.
 * @param {any} params.focusValue - The value to focus initially or when changed.
 * @returns {Object} State and handlers for the options list UI.
 */
function useSelectableOptions({
  visibleOptionCount = 5,
  options,
  defaultValue,
  onChange,
  onCancel,
  onFocus,
  focusValue
}) {
  // useReducer manages the core state of the options list (focused value, visible window, etc.)
  const [state, dispatch] = HF.useReducer(
    updateOptionListState,
    {
      visibleOptionCount,
      defaultValue,
      options,
      initialFocusValue: focusValue
    },
    initializeOptionListState
  );

  // Local state to track the current options array for comparison
  const [currentOptions, setCurrentOptions] = HF.useState(options);

  // If the options prop changes (and is not shallow-equal), reset the reducer state
  if (options !== currentOptions && !fx4(options, currentOptions)) {
    dispatch({
      type: "reset",
      state: initializeOptionListState({
        visibleOptionCount,
        defaultValue: state.value || defaultValue,
        options,
        initialFocusValue: state.focusedValue || focusValue
      })
    });
    setCurrentOptions(options);
  }

  // Handler to focus the next option
  const focusNextOption = HF.useCallback(() => {
    dispatch({ type: "focus-next-option" });
  }, []);

  // Handler to focus the previous option
  const focusPreviousOption = HF.useCallback(() => {
    dispatch({ type: "focus-previous-option" });
  }, []);

  // Handler to select the currently focused option
  const selectFocusedOption = HF.useCallback(() => {
    dispatch({ type: "select-focused-option" });
  }, []);

  // Memoized visible options slice, each with its index
  const visibleOptions = HF.useMemo(() => {
    return options
      .map((option, index) => ({ ...option, index }))
      .slice(state.visibleFromIndex, state.visibleToIndex);
  }, [options, state.visibleFromIndex, state.visibleToIndex]);

  // Notify parent when the focused value changes
  HF.useEffect(() => {
    if (state.focusedValue) {
      onFocus?.(state.focusedValue);
    }
  }, [state.focusedValue, onFocus]);

  // When focusValue prop changes, update the focused value in state
  HF.useEffect(() => {
    if (focusValue) {
      dispatch({ type: "set-focus", value: focusValue });
    }
  }, [focusValue]);

  return {
    focusedValue: state.focusedValue,
    visibleFromIndex: state.visibleFromIndex,
    visibleToIndex: state.visibleToIndex,
    value: state.value,
    visibleOptions,
    focusNextOption,
    focusPreviousOption,
    selectFocusedOption,
    onChange,
    onCancel,
    options
  };
}

module.exports = useSelectableOptions;
