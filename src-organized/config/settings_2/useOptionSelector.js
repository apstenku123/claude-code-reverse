/**
 * useOptionSelector
 *
 * Custom React hook for managing a selectable list of options with keyboard navigation and focus management.
 * Handles option visibility, focus, selection, and notifies parent components of changes.
 *
 * @param {Object} params - Parameters for the option selector.
 * @param {number} [params.visibleOptionCount=5] - Number of options to display at once.
 * @param {Array<Object>} params.options - The list of selectable options.
 * @param {*} params.defaultValue - The default selected value.
 * @param {Function} params.onChange - Callback when the selection changes.
 * @param {Function} params.onCancel - Callback when the selection is cancelled.
 * @param {Function} params.onFocus - Callback when an option receives focus.
 * @param {*} params.focusValue - The value to focus initially or when changed.
 * @returns {Object} Hook state and action handlers.
 */
function useOptionSelector({
  visibleOptionCount = 5,
  options,
  defaultValue,
  onChange,
  onCancel,
  onFocus,
  focusValue
}) {
  // useReducer for managing option selector state
  const [state, dispatch] = HF.useReducer(
    updateOptionListState,
    {
      visibleOptionCount,
      defaultValue,
      options,
      initialFocusValue: focusValue
    },
    initializeOptionListState // initializer function
  );

  // Local state to track the current options array
  const [currentOptions, setCurrentOptions] = HF.useState(options);

  // If the options prop changes (and is not shallow-equal), reset the state and update local options
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

  // Memoized list of visible options, each with an added index property
  const visibleOptions = HF.useMemo(() => {
    return options
      .map((option, index) => ({ ...option, index }))
      .slice(state.visibleFromIndex, state.visibleToIndex);
  }, [options, state.visibleFromIndex, state.visibleToIndex]);

  // Effect: Notify parent when the focused value changes
  HF.useEffect(() => {
    if (state.focusedValue) {
      onFocus?.(state.focusedValue);
    }
  }, [state.focusedValue, onFocus]);

  // Effect: If focusValue prop changes, update focus in state
  HF.useEffect(() => {
    if (focusValue) {
      dispatch({
        type: "set-focus",
        value: focusValue
      });
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

module.exports = useOptionSelector;
