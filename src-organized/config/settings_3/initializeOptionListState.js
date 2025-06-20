/**
 * Initializes the state for an option list UI component, determining which options are visible, focused, and selected.
 *
 * @param {Object} params - Parameters for initializing the option list state.
 * @param {number} params.visibleOptionCount - Maximum number of options to display at once.
 * @param {any} params.defaultValue - The default selected value for the option list.
 * @param {Array<Object>} params.options - The complete list of option objects.
 * @param {any} params.initialFocusValue - The value to be initially focused, if any.
 * @returns {Object} The initialized state for the option list component.
 * @property {Object} optionMap - a mapping of option values to option objects, created by oI1.
 * @property {number} visibleOptionCount - The number of options to display.
 * @property {any} focusedValue - The value currently focused in the list.
 * @property {number} visibleFromIndex - The starting index of visible options (always 0 initially).
 * @property {number} visibleToIndex - The ending index (exclusive) of visible options.
 * @property {any} value - The currently selected value.
 */
function initializeOptionListState({
  visibleOptionCount,
  defaultValue,
  options,
  initialFocusValue
}) {
  // Determine how many options to display: the lesser of visibleOptionCount and the total number of options
  const computedVisibleCount =
    typeof visibleOptionCount === "number"
      ? Math.min(visibleOptionCount, options.length)
      : options.length;

  // Create a mapping of option values to option objects for quick lookup
  const optionMap = new oI1(options);

  // Determine which value should be focused initially
  const focusedValue =
    initialFocusValue !== undefined && initialFocusValue !== null
      ? initialFocusValue
      : optionMap.first?.value;

  return {
    optionMap,
    visibleOptionCount: computedVisibleCount,
    focusedValue,
    visibleFromIndex: 0, // Always start from the first option
    visibleToIndex: computedVisibleCount, // Show up to computedVisibleCount options
    value: defaultValue
  };
}

module.exports = initializeOptionListState;