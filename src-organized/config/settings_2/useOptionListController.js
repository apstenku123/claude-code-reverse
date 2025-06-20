/**
 * Manages the state and behavior of an option list UI component, including focus, selection, and visible options.
 *
 * @param {Object} params - The parameters for the option list controller.
 * @param {number} [params.visibleOptionCount=5] - The number of options to display at once.
 * @param {Array<Object>} params.options - The full list of option objects.
 * @param {any} params.defaultValue - The default selected value.
 * @param {function} [params.onChange] - Callback invoked when the selected value changes.
 * @param {function} [params.onSubmit] - Callback invoked when the selection is submitted.
 * @returns {Object} An object containing state and action handlers for the option list UI.
 */
function useOptionListController({
  visibleOptionCount = 5,
  options,
  defaultValue,
  onChange,
  onSubmit
}) {
  // useReducer to manage the option list state
  const [optionListState, dispatchOptionListAction] = KF.useReducer(
    updateOptionListState, // reducer function (external dependency)
    {
      visibleOptionCount,
      defaultValue,
      options
    },
    initializeOptionListState // initializeOptionListState: initializes the state
  );

  // Local state to track the current options array reference
  const [currentOptions, setCurrentOptions] = KF.useState(options);

  // If the options prop changes (by reference or value), reset the reducer state and update local state
  if (options !== currentOptions && !pG0(options, currentOptions)) {
    dispatchOptionListAction({
      type: "reset",
      state: initializeOptionListState({
        visibleOptionCount,
        defaultValue,
        options
      })
    });
    setCurrentOptions(options);
  }

  // Handler to focus the next option
  const focusNextOption = KF.useCallback(() => {
    dispatchOptionListAction({ type: "focus-next-option" });
  }, []);

  // Handler to focus the previous option
  const focusPreviousOption = KF.useCallback(() => {
    dispatchOptionListAction({ type: "focus-previous-option" });
  }, []);

  // Handler to toggle the focused option'createInteractionAccessor selection
  const toggleFocusedOption = KF.useCallback(() => {
    dispatchOptionListAction({ type: "toggle-focused-option" });
  }, []);

  // Handler to submit the current selection
  const submitSelection = KF.useCallback(() => {
    if (onSubmit) {
      onSubmit(optionListState.value);
    }
  }, [optionListState.value, onSubmit]);

  // Compute the currently visible options, adding their index
  const visibleOptions = KF.useMemo(() => {
    return options
      .map((option, index) => ({
        ...option,
        index
      }))
      .slice(optionListState.visibleFromIndex, optionListState.visibleToIndex);
  }, [options, optionListState.visibleFromIndex, optionListState.visibleToIndex]);

  // Effect: call onChange if the selected value changes
  KF.useEffect(() => {
    if (!pG0(optionListState.previousValue, optionListState.value)) {
      if (onChange) {
        onChange(optionListState.value);
      }
    }
  }, [optionListState.previousValue, optionListState.value, options, onChange]);

  // Return the controller API
  return {
    focusedValue: optionListState.focusedValue,
    visibleFromIndex: optionListState.visibleFromIndex,
    visibleToIndex: optionListState.visibleToIndex,
    value: optionListState.value,
    visibleOptions,
    focusNextOption,
    focusPreviousOption,
    toggleFocusedOption,
    submit: submitSelection
  };
}

module.exports = useOptionListController;
