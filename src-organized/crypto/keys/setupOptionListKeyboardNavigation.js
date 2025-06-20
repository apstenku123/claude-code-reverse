/**
 * Sets up keyboard navigation and selection handlers for an option list component.
 * Handles arrow keys, shortcuts, number selection, and cancel actions.
 *
 * @param {Object} params - Parameters for keyboard navigation setup.
 * @param {boolean} [params.isDisabled=false] - Whether the option list is disabled.
 * @param {Object} params.state - The state object containing option list methods and properties.
 * @param {Function} params.state.focusNextOption - Moves focus to the next option.
 * @param {Function} params.state.focusPreviousOption - Moves focus to the previous option.
 * @param {Function} [params.state.selectFocusedOption] - Selects the currently focused option.
 * @param {Function} [params.state.onChange] - Callback when an option is selected.
 * @param {Function} [params.state.onCancel] - Callback when the cancel action is triggered.
 * @param {Array} params.state.options - Array of option objects.
 * @param {any} params.state.focusedValue - The value of the currently focused option.
 * @returns {void}
 */
function setupOptionListKeyboardNavigation({
  isDisabled = false,
  state
}) {
  D0((keyInput, keyModifiers) => {
    // Handle navigation to next option
    if (
      keyModifiers.downArrow ||
      (keyModifiers.ctrl && keyInput === "n") ||
      (!keyModifiers.ctrl && !keyModifiers.shift && keyInput === "j")
    ) {
      state.focusNextOption();
    }

    // Handle navigation to previous option
    if (
      keyModifiers.upArrow ||
      (keyModifiers.ctrl && keyInput === "createIterableHelper") ||
      (!keyModifiers.ctrl && !keyModifiers.shift && keyInput === "k")
    ) {
      state.focusPreviousOption();
    }

    // Handle selection of the focused option
    if (keyModifiers.return && state.focusedValue) {
      state.selectFocusedOption?.();
      state.onChange?.(state.focusedValue);
    }

    // Handle selection by number key (1-9, etc.)
    if (/^[0-9]+$/.test(keyInput)) {
      const optionIndex = parseInt(keyInput) - 1;
      if (optionIndex >= 0 && optionIndex < state.options.length) {
        state.onChange?.(state.options[optionIndex].value);
        return;
      }
    }

    // Handle cancel action (Escape key)
    if (keyModifiers.escape) {
      state.onCancel?.();
    }
  }, {
    isActive: !isDisabled
  });
}

module.exports = setupOptionListKeyboardNavigation;