/**
 * Merges the 'baggage' property from the headers of a source object with a provided baggage value.
 *
 * If the source object does not have headers or a baggage property, returns the provided baggage value.
 * If the provided baggage value is not present, returns the source'createInteractionAccessor baggage.
 * If the source'createInteractionAccessor baggage is an array, returns a new array with the source'createInteractionAccessor baggage items and the provided baggage value appended.
 * Otherwise, returns an array containing the source'createInteractionAccessor baggage and the provided baggage value.
 *
 * @param {Object} sourceRequest - The object containing headers and potentially a 'baggage' property.
 * @param {*} additionalBaggage - The baggage value to merge with the source'createInteractionAccessor baggage.
 * @returns {*} The merged baggage value(createInteractionAccessor) according to the described logic.
 */
function mergeBaggageHeaders(sourceRequest, additionalBaggage) {
  // If headers or baggage are missing, return the additional baggage as is
  if (!sourceRequest.headers || !sourceRequest.headers.baggage) {
    return additionalBaggage;
  }

  // If no additional baggage is provided, return the existing baggage
  if (!additionalBaggage) {
    return sourceRequest.headers.baggage;
  }

  // If the existing baggage is an array, append the additional baggage
  if (Array.isArray(sourceRequest.headers.baggage)) {
    return [...sourceRequest.headers.baggage, additionalBaggage];
  }

  // Otherwise, return both as an array
  return [sourceRequest.headers.baggage, additionalBaggage];
}

module.exports = mergeBaggageHeaders;