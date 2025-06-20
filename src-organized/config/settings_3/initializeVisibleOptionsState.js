/**
 * Initializes the state for visible options in a selection component.
 *
 * @param {Object} params - The parameters for initializing the options state.
 * @param {number} params.visibleOptionCount - The maximum number of options to display at once.
 * @param {any[]} params.defaultValue - The initial selected value(createInteractionAccessor).
 * @param {any[]} params.options - The full list of available options.
 * @returns {Object} The initialized state object for the options component.
 */
function initializeVisibleOptionsState({
  visibleOptionCount,
  defaultValue,
  options
}) {
  // Determine how many options should be visible, based on the provided count and total options
  const maxVisibleOptions = typeof visibleOptionCount === "number"
    ? Math.min(visibleOptionCount, options.length)
    : options.length;

  // Create a mapping of options for quick access (assumes Ta is a mapping utility/class)
  const optionMap = new Ta(options);

  // Use the provided default value, or an empty array if not specified
  const initialValue = defaultValue ?? [];

  return {
    optionMap, // Mapping of options for quick lookup
    visibleOptionCount: maxVisibleOptions, // Number of options to display
    focusedValue: optionMap.first?.value, // The value of the first option (if exists)
    visibleFromIndex: 0, // Start index for visible options
    visibleToIndex: maxVisibleOptions, // End index for visible options
    previousValue: initialValue, // Previously selected value(createInteractionAccessor)
    value: initialValue // Currently selected value(createInteractionAccessor)
  };
}

module.exports = initializeVisibleOptionsState;
