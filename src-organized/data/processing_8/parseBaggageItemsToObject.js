/**
 * Parses a baggage items string into an object mapping keys to values.
 *
 * The input string is expected to contain key-value pairs separated by a defined separator.
 * Each pair is parsed using the external parseBaggageEntry function, and only valid pairs with non-empty values are included in the result.
 *
 * @param {string} baggageItemsString - The string containing baggage items to parse.
 * @returns {Object} An object mapping baggage item keys to their corresponding values.
 */
function parseBaggageItemsToObject(baggageItemsString) {
  // Validate input: must be a non-empty string
  if (typeof baggageItemsString !== "string" || baggageItemsString.length === 0) {
    return {};
  }

  // Split the string into individual baggage item entries
  const baggageItemEntries = baggageItemsString.split(eS.BAGGAGE_ITEMS_SEPARATOR);

  // Parse each entry into an object using parseBaggageEntry, filter out invalid or empty values, and reduce to a key-value object
  const baggageItemsObject = baggageItemEntries
    .map(entry => parseBaggageEntry(entry))
    .filter(parsedEntry => parsedEntry !== undefined && parsedEntry.value.length > 0)
    .reduce((result, parsedEntry) => {
      // Assign the value to the corresponding key in the result object
      result[parsedEntry.key] = parsedEntry.value;
      return result;
    }, {});

  return baggageItemsObject;
}

module.exports = parseBaggageItemsToObject;