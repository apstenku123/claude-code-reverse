/**
 * Processes an image subscription through multiple transformation and validation steps.
 *
 * This function attempts to process an image subscription using a series of asynchronous operations:
 *   1. Creates a subscription from the provided source and configuration.
 *   2. Attempts to validate the subscription.
 *   3. If validation fails and the format is PNG, attempts a PNG-specific processing step.
 *   4. If still unresolved, attempts a generic image processing step with a quality parameter.
 *   5. As a last resort, attempts a final fallback processing step.
 *   6. If any error occurs during the process, logs the error and performs a recovery operation.
 *
 * @async
 * @function processImageSubscription
 * @param {object} sourceObservable - The source observable or image data to process.
 * @param {object} config - Configuration options for processing the image subscription.
 * @returns {Promise<any>} The result of the first successful processing step, or the recovery result if an error occurs.
 */
async function processImageSubscription(sourceObservable, config) {
  try {
    // Step 1: Create a subscription from the source and config
    const subscription = await getImageBufferAndMetadata(sourceObservable, config);

    // Step 2: Attempt to validate the subscription
    const validationResult = await resizeImageToFitMaxBytes(subscription);
    if (validationResult) {
      return validationResult;
    }

    // Step 3: If the format is PNG, attempt PNG-specific processing
    if (subscription.format === "png") {
      const pngProcessingResult = await resizeAndCompressImageBuffer(subscription);
      if (pngProcessingResult) {
        return pngProcessingResult;
      }
    }

    // Step 4: Attempt generic image processing with quality parameter
    const genericProcessingResult = await resizeImageToJpegWithinLimit(subscription, 50);
    if (genericProcessingResult) {
      return genericProcessingResult;
    }

    // Step 5: Final fallback processing
    return await resizeAndCompressImage(subscription);
  } catch (error) {
    // Log the error and perform recovery operation
    reportErrorIfAllowed(error);
    return await resizeAndCompressImageToJpeg(sourceObservable);
  }
}

module.exports = processImageSubscription;