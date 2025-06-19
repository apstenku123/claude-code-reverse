/**
 * Processes and validates a domain string by applying transformations and extracting labels.
 * 
 * This function takes a source observable, configuration, and subscription, then:
 *   1. Processes the input using mapUnicodeStringWithStatus to get an object with a string and error property.
 *   2. Applies CD2 transformation to the string.
 *   3. Splits the string by '.' and processes each segment with validateDomainLabel to extract labels and check for errors.
 *   4. Returns the reconstructed string and an error flag.
 *
 * @param {any} sourceObservable - The source observable or input object to process.
 * @param {any} config - Configuration options for processing.
 * @param {any} subscription - Subscription or context parameter for processing.
 * @returns {{ string: string, error: boolean }} An object containing the processed string and an error flag.
 */
function processAndValidateDomainString(sourceObservable, config, subscription) {
  // Process input and get initial result object
  const result = mapUnicodeStringWithStatus(sourceObservable, config, subscription);

  // Apply transformation to the string property
  result.string = CD2(result.string);

  // Split the string into segments by '.'
  const domainSegments = result.string.split(".");

  // Iterate over each segment to extract labels and check for errors
  for (let segmentIndex = 0; segmentIndex < domainSegments.length; ++segmentIndex) {
    try {
      // Extract label and error info from the segment
      const labelResult = validateDomainLabel(domainSegments[segmentIndex]);
      domainSegments[segmentIndex] = labelResult.label;
      // If any segment has an error, set the error flag
      result.error = result.error || labelResult.error;
    } catch (error) {
      // If an exception occurs, set the error flag
      result.error = true;
    }
  }

  // Reconstruct the string and return the result
  return {
    string: domainSegments.join("."),
    error: result.error
  };
}

module.exports = processAndValidateDomainString;