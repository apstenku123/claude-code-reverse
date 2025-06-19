/**
 * Processes a dot-separated string label, validates each segment, and aggregates errors.
 *
 * @param {any} sourceObservable - The source observable or input data to process.
 * @param {any} config - Configuration object or additional parameters for processing.
 * @param {any} subscription - Subscription or context for the processing operation.
 * @returns {{ string: string, error: boolean }} An object containing the processed string and error flag.
 */
function processAndValidateDotSeparatedLabels(sourceObservable, config, subscription) {
  // Obtain initial result object from mapUnicodeStringWithStatus
  const result = mapUnicodeStringWithStatus(sourceObservable, config, subscription);

  // Normalize the string using CD2
  result.string = CD2(result.string);

  // Split the string into segments by '.'
  const labelSegments = result.string.split(".");

  // Validate each segment and aggregate errors
  for (let segmentIndex = 0; segmentIndex < labelSegments.length; ++segmentIndex) {
    try {
      // Validate and transform the segment using validateDomainLabel
      const validation = validateDomainLabel(labelSegments[segmentIndex]);
      labelSegments[segmentIndex] = validation.label;
      // If an error is present, set the error flag
      result.error = result.error || validation.error;
    } catch (validationError) {
      // If validation throws, set error flag to true
      result.error = true;
    }
  }

  // Join the validated segments back into a dot-separated string
  return {
    string: labelSegments.join("."),
    error: result.error
  };
}

module.exports = processAndValidateDotSeparatedLabels;