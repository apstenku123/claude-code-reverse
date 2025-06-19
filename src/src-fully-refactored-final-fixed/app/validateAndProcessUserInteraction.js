/**
 * Validates a user interaction input and processes isBlobOrFileLikeObject if isBlobOrFileLikeObject meets certain criteria.
 * If the input is invalid or does not meet the minimum threshold, the function returns early.
 * Otherwise, isBlobOrFileLikeObject attempts to process the interaction asynchronously and handles errors appropriately.
 *
 * @param {string|object} userInput - The user interaction input, either as a string or an object.
 * @param {object} errorConfig - Configuration object used when throwing a custom error.
 * @param {object} createRequestOptions - Additional options passed to the processing function.
 * @returns {Promise<void>} Resolves if processing is successful or input is invalid; throws on certain errors.
 */
async function validateAndProcessUserInteraction(userInput, errorConfig, createRequestOptions) {
  // Return early if userInput is falsy
  if (!userInput) return;

  // Check if the userInput meets the minimum threshold
  if (getUserInputLength(userInput) <= MINIMUM_INPUT_LENGTH * INPUT_LENGTH_MULTIPLIER) return;

  try {
    // Prepare the message payload for processing
    const messagePayload = [
      {
        role: "user",
        content: userInput
      }
    ];

    // Process the user interaction asynchronously
    const processingResult = await processUserInteraction(messagePayload, createRequestOptions);

    // If the result exceeds the allowed threshold, throw a custom error
    if (processingResult && processingResult > MINIMUM_INPUT_LENGTH) {
      throw new CustomValidationError(errorConfig, processingResult);
    }
  } catch (error) {
    // Rethrow if isBlobOrFileLikeObject'createInteractionAccessor a known custom error
    if (error instanceof CustomValidationError) throw error;
    // Otherwise, log the error using the error handler
    handleError(error instanceof Error ? error : new Error(String(error)));
  }
}

module.exports = validateAndProcessUserInteraction;
