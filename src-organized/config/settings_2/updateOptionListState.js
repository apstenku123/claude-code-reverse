/**
 * Updates the state of an option list (such as a dropdown or select menu) based on a given action.
 * Handles focus movement, selection, and state resets for keyboard navigation and UI interaction.
 *
 * @param {Object} state - The current state of the option list.
 * @param {Object} action - The action to perform, containing a 'type' and any additional data.
 * @returns {Object} The new state after applying the action.
 */
function updateOptionListState(state, action) {
  switch (action.type) {
    case "focus-next-option": {
      // If there is no currently focused value, return the state unchanged
      if (!state.focusedValue) return state;

      // Get the currently focused option from the option map
      const currentOption = state.optionMap.get(state.focusedValue);
      if (!currentOption) return state;

      // Get the next option in the list
      const nextOption = currentOption.next;
      if (!nextOption) return state;

      // If the next option is within the visible range, just update the focused value
      if (!(nextOption.index >= state.visibleToIndex)) {
        return {
          ...state,
          focusedValue: nextOption.value
        };
      }

      // If the next option is outside the visible range, update the visible window
      const newVisibleToIndex = Math.min(state.optionMap.size, state.visibleToIndex + 1);
      const newVisibleFromIndex = newVisibleToIndex - state.visibleOptionCount;
      return {
        ...state,
        focusedValue: nextOption.value,
        visibleFromIndex: newVisibleFromIndex,
        visibleToIndex: newVisibleToIndex
      };
    }
    case "focus-previous-option": {
      // If there is no currently focused value, return the state unchanged
      if (!state.focusedValue) return state;

      // Get the currently focused option from the option map
      const currentOption = state.optionMap.get(state.focusedValue);
      if (!currentOption) return state;

      // Get the previous option in the list
      const previousOption = currentOption.previous;
      if (!previousOption) return state;

      // If the previous option is within the visible range, just update the focused value
      if (!(previousOption.index <= state.visibleFromIndex)) {
        return {
          ...state,
          focusedValue: previousOption.value
        };
      }

      // If the previous option is outside the visible range, update the visible window
      const newVisibleFromIndex = Math.max(0, state.visibleFromIndex - 1);
      const newVisibleToIndex = newVisibleFromIndex + state.visibleOptionCount;
      return {
        ...state,
        focusedValue: previousOption.value,
        visibleFromIndex: newVisibleFromIndex,
        visibleToIndex: newVisibleToIndex
      };
    }
    case "select-focused-option":
      // Select the currently focused option by setting value to focusedValue
      return {
        ...state,
        value: state.focusedValue
      };
    case "reset":
      // Reset the state to the provided state in the action
      return action.state;
    case "set-focus":
      // Set the focused value to the value provided in the action
      return {
        ...state,
        focusedValue: action.value
      };
    default:
      // If the action type is unrecognized, return the state unchanged
      return state;
  }
}

module.exports = updateOptionListState;
