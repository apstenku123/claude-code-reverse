/**
 * Creates a value selector function based on the provided value definitions.
 *
 * The returned function selects a value from the provided definitions based on the input key,
 * context (e.g., formatting or standalone), and width. Optionally, an argument callback can be used
 * to transform the input key before selection.
 *
 * @param {Object} valueDefinitions - Object containing value maps and configuration.
 * @param {Object} valueDefinitions.values - Map of width to value arrays/objects for standalone context.
 * @param {Object} [valueDefinitions.formattingValues] - Map of width to value arrays/objects for formatting context.
 * @param {string} [valueDefinitions.defaultWidth] - Default width to use if none is specified.
 * @param {string} [valueDefinitions.defaultFormattingWidth] - Default formatting width to use if none is specified.
 * @param {Function} [valueDefinitions.argumentCallback] - Optional callback to transform the input key.
 * @returns {Function} Selector function that takes a key and an options object, and returns the selected value.
 *
 * @example
 * const selectMonth = createValueSelector({
 *   values: { narrow: [...], wide: [...] },
 *   formattingValues: { narrow: [...], wide: [...] },
 *   defaultWidth: 'wide',
 *   defaultFormattingWidth: 'narrow',
 *   argumentCallback: (index) => index - 1
 * });
 *
 * const monthName = selectMonth(1, { context: 'formatting', width: 'narrow' });
 */
function createValueSelector(valueDefinitions) {
  return (inputKey, options) => {
    // Determine context: 'formatting', 'standalone', etc.
    const context = options?.context ? String(options.context) : "standalone";
    let valueMap;

    if (context === "formatting" && valueDefinitions.formattingValues) {
      // Use formatting values if context is 'formatting'
      const defaultFormattingWidth = valueDefinitions.defaultFormattingWidth || valueDefinitions.defaultWidth;
      const width = options?.width ? String(options.width) : defaultFormattingWidth;
      // Fallback to default formatting width if width not found
      valueMap = valueDefinitions.formattingValues[width] || valueDefinitions.formattingValues[defaultFormattingWidth];
    } else {
      // Use standalone values otherwise
      const defaultWidth = valueDefinitions.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      // Fallback to default width if width not found
      valueMap = valueDefinitions.values[width] || valueDefinitions.values[defaultWidth];
    }

    // Optionally transform the input key using argumentCallback
    const resolvedKey = valueDefinitions.argumentCallback
      ? valueDefinitions.argumentCallback(inputKey)
      : inputKey;

    // Return the selected value
    return valueMap[resolvedKey];
  };
}

module.exports = createValueSelector;