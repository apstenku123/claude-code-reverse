/**
 * Handles keyboard navigation and actions for an option list component.
 * Sets up keyboard event listeners to allow navigation (up/down), selection (space), and submission (enter/return) of options.
 *
 * @param {Object} params - The parameters for the handler.
 * @param {boolean} [params.isDisabled=false] - Whether the option list is disabled. If true, keyboard navigation is inactive.
 * @param {Object} params.optionListController - Controller object with methods to manipulate the option list (focusNextOption, focusPreviousOption, toggleFocusedOption, submit).
 * @returns {void}
 */
function handleOptionListKeyboardNavigation({
  isDisabled = false,
  optionListController
}) {
  // Register keyboard event handlers using D0 utility
  D0((pressedKey, keyEvents) => {
    // Navigate to the next option when down arrow is pressed
    if (keyEvents.downArrow) {
      optionListController.focusNextOption();
    }
    // Navigate to the previous option when up arrow is pressed
    if (keyEvents.upArrow) {
      optionListController.focusPreviousOption();
    }
    // Toggle the focused option when spacebar is pressed
    if (pressedKey === " ") {
      optionListController.toggleFocusedOption();
    }
    // Submit the selection when return/enter is pressed
    if (keyEvents.return) {
      optionListController.submit();
    }
  }, {
    // Only activate keyboard navigation if not disabled
    isActive: !isDisabled
  });
}

module.exports = handleOptionListKeyboardNavigation;