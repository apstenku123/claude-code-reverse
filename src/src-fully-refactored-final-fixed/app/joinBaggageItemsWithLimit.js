/**
 * Concatenates an array of baggage item strings using a separator, ensuring the total length does not exceed a maximum limit.
 * If adding the next item would exceed the limit, the concatenation stops and returns the current result.
 *
 * @param {string[]} baggageItems - Array of baggage item strings to join.
 * @param {object} options - Configuration object containing separator and max length.
 * @param {string} options.separator - String used to separate baggage items.
 * @param {number} options.maxTotalLength - Maximum allowed length of the resulting string.
 * @returns {string} Concatenated baggage items string, not exceeding the maximum length.
 */
function joinBaggageItemsWithLimit(baggageItems, options) {
  const { separator, maxTotalLength } = options;
  return baggageItems.reduce((joinedString, currentItem) => {
    // Only add the separator if joinedString is not empty
    const candidateString = `${joinedString}${joinedString !== "" ? separator : ""}${currentItem}`;
    // If adding the current item exceeds the max length, return the previous string
    return candidateString.length > maxTotalLength ? joinedString : candidateString;
  }, "");
}

module.exports = joinBaggageItemsWithLimit;