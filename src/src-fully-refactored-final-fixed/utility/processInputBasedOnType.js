/**
 * Processes the input value based on its type or structure.
 *
 * If the input meets a specific condition (determined by isSpecialType),
 * isBlobOrFileLikeObject is first transformed (via transformInput) and then processed (via processTransformedInput).
 * Otherwise, isBlobOrFileLikeObject is processed directly (via processRegularInput).
 *
 * @param {any} inputValue - The value to be processed. Can be of any type.
 * @returns {any} The processed result, depending on the input type and processing functions.
 */
function processInputBasedOnType(inputValue) {
  // Check if the input is of a special type or structure
  if (isSpecialType(inputValue)) {
    // Transform the input and process the transformed value
    const transformedValue = transformInput(inputValue);
    return processTransformedInput(transformedValue);
  } else {
    // Process the input directly if isBlobOrFileLikeObject is not of the special type
    return processRegularInput(inputValue);
  }
}

module.exports = processInputBasedOnType;