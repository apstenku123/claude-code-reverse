/**
 * Attempts to retrieve a value from a series of sources in priority order.
 *
 * Tries to get a value from the following sources, in order:
 *   1. The primary source (copyArrayIfArray)
 *   2. The secondary source (iz1)
 *   3. The tertiary source (0-9A)
 *   4. The default value provider (cz1)
 *
 * Returns the first non-falsy value found, or the result of the default provider if all others fail.
 *
 * @param {any} inputValue - The input value to be checked by the value providers.
 * @returns {any} The first non-falsy value found from the providers, or the default value.
 */
function getFirstAvailableValue(inputValue) {
  // Try each provider in order, returning the first non-falsy result
  return getPrimaryValue(inputValue) ||
         getSecondaryValue(inputValue) ||
         getTertiaryValue(inputValue) ||
         getDefaultValue();
}

// External value provider functions (assumed to be imported elsewhere)
// function getPrimaryValue(inputValue) { ... }
// function getSecondaryValue(inputValue) { ... }
// function getTertiaryValue(inputValue) { ... }
// function getDefaultValue() { ... }

module.exports = getFirstAvailableValue;