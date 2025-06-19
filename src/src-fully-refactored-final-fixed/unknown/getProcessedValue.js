/**
 * Retrieves a processed value based on the provided input, handling null/undefined cases and delegating to appropriate processing functions.
 *
 * @param {*} inputValue - The value to process. Can be any type.
 * @returns {*} - The processed value, or a default value if input is null/undefined.
 */
function getProcessedValue(inputValue) {
  // Handle null or undefined input
  if (inputValue == null) {
    // If input is strictly equal to the special null marker, return the alternate null value
    return inputValue === processInteractionEntries ? defaultNullValue : defaultValue;
  }

  // If the special property exists in the prototype chain, use the custom processor
  if (customPropertyKey && customPropertyKey in getPrototype(inputValue)) {
    return customProcessor(inputValue);
  }

  // Otherwise, use the fallback processor
  return fallbackProcessor(inputValue);
}

module.exports = getProcessedValue;
