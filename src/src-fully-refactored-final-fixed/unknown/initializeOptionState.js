/**
 * Initializes the state for a selectable options list, including mapping options, 
 * determining visible option count, and setting initial selection values.
 *
 * @param {Object} params - The parameters for initializing the option state.
 * @param {number} params.visibleOptionCount - The maximum number of options to display at once.
 * @param {any[]} params.defaultValue - The default selected value(createInteractionAccessor) for the options list.
 * @param {any[]} params.options - The full array of option objects to display.
 * @returns {Object} The initialized option state, including option mapping, visible range, and selection values.
 */
function initializeOptionState({
  visibleOptionCount,
  defaultValue,
  options
}) {
  // Determine how many options should be visible, capped by the total number of options
  const maxVisibleOptions = typeof visibleOptionCount === "number"
    ? Math.min(visibleOptionCount, options.length)
    : options.length;

  // Create a mapping of options for quick lookup and navigation
  const optionMap = new Ta(options);

  // Use defaultValue if provided, otherwise default to an empty array
  const initialValue = defaultValue ?? [];

  return {
    optionMap: optionMap, // Map of options for lookup/navigation
    visibleOptionCount: maxVisibleOptions, // Number of options to display
    focusedValue: optionMap.first?.value, // The value of the first option (if exists)
    visibleFromIndex: 0, // Start index for visible options
    visibleToIndex: maxVisibleOptions, // End index for visible options
    previousValue: initialValue, // Previous selected value(createInteractionAccessor)
    value: initialValue // Current selected value(createInteractionAccessor)
  };
}

module.exports = initializeOptionState;