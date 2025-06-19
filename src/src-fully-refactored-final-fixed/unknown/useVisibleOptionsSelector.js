/**
 * Manages the state and behavior for a selectable list of options with focus and visible window logic.
 * Useful for dropdowns, select menus, or any UI component that needs to manage a visible subset of options,
 * keyboard navigation, and selection/submit events.
 *
 * @param {Object} params - The configuration object.
 * @param {number} [params.visibleOptionCount=5] - Number of options to display at once.
 * @param {Array} params.options - The full list of selectable option objects.
 * @param {*} params.defaultValue - The default selected value.
 * @param {Function} [params.onChange] - Callback fired when the selected value changes.
 * @param {Function} [params.onSubmit] - Callback fired when the selection is submitted.
 * @returns {Object} State and handlers for managing visible options and selection.
 */
function useVisibleOptionsSelector({
  visibleOptionCount = 5,
  options,
  defaultValue,
  onChange,
  onSubmit
}) {
  // useReducer to manage the selection and visible window state
  const [state, dispatch] = KF.useReducer(updateOptionListState, {
    visibleOptionCount,
    defaultValue,
    options
  }, initializeVisibleOptionsState);

  // Local state to track the current options array (for detecting changes)
  const [currentOptions, setCurrentOptions] = KF.useState(options);

  // If the options prop changes (by reference or value), reset the reducer and update local state
  if (options !== currentOptions && !areOptionsEqual(options, currentOptions)) {
    dispatch({
      type: "reset",
      state: initializeVisibleOptionsState({
        visibleOptionCount,
        defaultValue,
        options
      })
    });
    setCurrentOptions(options);
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
  const submitSelection = KF.useCallback(() => {
    if (onSubmit) {
      onSubmit(state.value);
    }
  }, [state.value, onSubmit]);

  // Compute the visible options window, adding index to each option
  const visibleOptions = KF.useMemo(() => {
    return options
      .map((option, index) => ({
        ...option,
        index
      }))
      .slice(state.visibleFromIndex, state.visibleToIndex);
  }, [options, state.visibleFromIndex, state.visibleToIndex]);

  // Effect: call onChange when the value changes
  KF.useEffect(() => {
    if (!areOptionsEqual(state.previousValue, state.value)) {
      if (onChange) {
        onChange(state.value);
      }
    }
  }, [state.previousValue, state.value, options, onChange]);

  return {
    focusedValue: state.focusedValue,
    visibleFromIndex: state.visibleFromIndex,
    visibleToIndex: state.visibleToIndex,
    value: state.value,
    visibleOptions,
    focusNextOption,
    focusPreviousOption,
    toggleFocusedOption,
    submit: submitSelection
  };
}

// Aliases for external dependencies (should be imported or defined elsewhere)
// KF: React-like hooks context (useReducer, useState, useCallback, useMemo, useEffect)
// updateOptionListState: Reducer function for selection state
// initializeVisibleOptionsState: Function to initialize state
// areOptionsEqual: Function to compare options (was pG0)

module.exports = useVisibleOptionsSelector;
