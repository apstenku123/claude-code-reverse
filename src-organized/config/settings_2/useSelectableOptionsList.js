/**
 * useSelectableOptionsList
 *
 * Custom React hook for managing a selectable list of options with focus, selection, and submission logic.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {number} [params.visibleOptionCount=5] - Number of options to display at once.
 * @param {Array<Object>} params.options - The list of selectable options.
 * @param {any} params.defaultValue - The default selected value.
 * @param {function} params.onChange - Callback when the selected value changes.
 * @param {function} params.onSubmit - Callback when the selection is submitted.
 * @returns {Object} An object containing state and action handlers for the options list.
 */
function useSelectableOptionsList({
  visibleOptionCount = 5,
  options,
  defaultValue,
  onChange,
  onSubmit
}) {
  // useReducer for managing the options list state
  const [state, dispatch] = KF.useReducer(
    updateOptionListState, // reducer function
    {
      visibleOptionCount,
      defaultValue,
      options
    },
    initializeOptionState // initializeOptionListState: initializes the state
  );

  // Local state to track the current options array reference
  const [optionsState, setOptionsState] = KF.useState(options);

  // If the options prop changes (by reference or value), reset the reducer state and update local state
  if (options !== optionsState && !pG0(options, optionsState)) {
    dispatch({
      type: "reset",
      state: initializeOptionState({
        visibleOptionCount,
        defaultValue,
        options
      })
    });
    setOptionsState(options);
  }

  // Handler to focus the next option
  const focusNextOption = KF.useCallback(() => {
    dispatch({ type: "focus-next-option" });
  }, []);

  // Handler to focus the previous option
  const focusPreviousOption = KF.useCallback(() => {
    dispatch({ type: "focus-previous-option" });
  }, []);

  // Handler to toggle the focused option'createInteractionAccessor selection
  const toggleFocusedOption = KF.useCallback(() => {
    dispatch({ type: "toggle-focused-option" });
  }, []);

  // Handler to submit the current selection
  const submit = KF.useCallback(() => {
    if (onSubmit) {
      onSubmit(state.value);
    }
  }, [state.value, onSubmit]);

  // Compute the currently visible options, adding their index for rendering
  const visibleOptions = KF.useMemo(() => {
    return options
      .map((option, index) => ({
        ...option,
        index
      }))
      .slice(state.visibleFromIndex, state.visibleToIndex);
  }, [options, state.visibleFromIndex, state.visibleToIndex]);

  // Effect: call onChange if the value changes
  KF.useEffect(() => {
    if (!pG0(state.previousValue, state.value)) {
      if (onChange) {
        onChange(state.value);
      }
    }
  }, [state.previousValue, state.value, options, onChange]);

  // Return the API for the options list
  return {
    focusedValue: state.focusedValue,
    visibleFromIndex: state.visibleFromIndex,
    visibleToIndex: state.visibleToIndex,
    value: state.value,
    visibleOptions,
    focusNextOption,
    focusPreviousOption,
    toggleFocusedOption,
    submit
  };
}

module.exports = useSelectableOptionsList;
