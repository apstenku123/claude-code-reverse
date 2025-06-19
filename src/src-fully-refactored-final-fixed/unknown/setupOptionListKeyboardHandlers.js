/**
 * Handles keyboard navigation and actions for an option list component.
 * Sets up event listeners for arrow keys, space, and return to control option focus and selection.
 *
 * @param {Object} params - The parameters object.
 * @param {boolean} [params.isDisabled=false] - Whether the option list is disabled. If true, keyboard handlers are inactive.
 * @param {Object} params.optionListController - Controller object with methods to manipulate option focus and selection.
 * @param {Function} optionListController.focusNextOption - Moves focus to the next option.
 * @param {Function} optionListController.focusPreviousOption - Moves focus to the previous option.
 * @param {Function} optionListController.toggleFocusedOption - Toggles the selection of the currently focused option.
 * @param {Function} optionListController.submit - Submits the current selection.
 * @returns {void}
 */
function setupOptionListKeyboardHandlers({
  isDisabled = false,
  optionListController
}) {
  // Register keyboard event handlers if the option list is active
  D0((pressedKey, keyEvents) => {
    // Move focus to the next option on down arrow
    if (keyEvents.downArrow) optionListController.focusNextOption();
    // Move focus to the previous option on up arrow
    if (keyEvents.upArrow) optionListController.focusPreviousOption();
    // Toggle selection of the focused option on spacebar
    if (pressedKey === " ") optionListController.toggleFocusedOption();
    // Submit the selection on return key
    if (keyEvents.return) optionListController.submit();
  }, {
    isActive: !isDisabled
  });
}

module.exports = setupOptionListKeyboardHandlers;