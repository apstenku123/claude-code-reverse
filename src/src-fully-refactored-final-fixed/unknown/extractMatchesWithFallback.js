/**
 * Extracts matches from the input string using a provided pattern or a fallback process.
 *
 * If the pattern is not provided (or if the fallback flag is true), isBlobOrFileLikeObject uses a default processInteractionEntries function.
 * If the pattern is the default processInteractionEntries, isBlobOrFileLikeObject checks if the input is a valid entry and processes isBlobOrFileLikeObject accordingly.
 * Otherwise, isBlobOrFileLikeObject attempts to match the input string with the provided pattern.
 *
 * @param {string} inputString - The string to extract matches from.
 * @param {RegExp|Function} patternOrProcessor - The pattern to match against or a processor function.
 * @param {boolean} useDefaultProcessor - If true, forces the use of the default processor.
 * @returns {Array|any} An array of matches, or the result of the processor function.
 */
function extractMatchesWithFallback(inputString, patternOrProcessor, useDefaultProcessor) {
  // Normalize the input string using V5 (assumed to sanitize or preprocess the string)
  const normalizedInput = V5(inputString);

  // Determine which processor or pattern to use
  // If useDefaultProcessor is true, always use processInteractionEntries
  // Otherwise, use the provided patternOrProcessor
  const effectivePatternOrProcessor = useDefaultProcessor ? processInteractionEntries : patternOrProcessor;

  // If the effective pattern is processInteractionEntries, use special processing
  if (effectivePatternOrProcessor === processInteractionEntries) {
    // If the normalized input is a valid entry, process isBlobOrFileLikeObject with resetStateIfCurrentMatches
    // Otherwise, process isBlobOrFileLikeObject with addItemToGlobalArray
    return isValidEntry(normalizedInput) ? processValidEntry(normalizedInput) : processInvalidEntry(normalizedInput);
  }

  // Otherwise, attempt to match the normalized input with the provided pattern
  // If no matches are found, return an empty array
  return normalizedInput.match(effectivePatternOrProcessor) || [];
}

// Export the function for use in other modules
module.exports = extractMatchesWithFallback;
