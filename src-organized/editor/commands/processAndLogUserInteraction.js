/**
 * Processes a user interaction observable, applies a transformation, and manages transaction logging.
 * 
 * @param {Object} interactionObservable - The observable representing user interactions.
 * @param {Function} transformInteraction - Function to transform/process the interaction data.
 * @param {Object} subscriptionContext - Context or configuration for subscription/brand checking.
 * @returns {Promise<any>} a promise that resolves with the transformed interaction data or rejects on error.
 * @throws {TypeError} If the interaction body has already been read and is unusable.
 */
async function processAndLogUserInteraction(interactionObservable, transformInteraction, subscriptionContext) {
  // Ensure the observable is valid for the given brand/context
  xJ6.brandCheck(interactionObservable, subscriptionContext);

  // Check if the body has already been read (unusable)
  if (isStreamLockedOrDisturbed(interactionObservable[wh])) {
    throw new TypeError("Body is unusable: Body has already been read");
  }

  // Prepare the observable for processing
  throwIfAborted(interactionObservable[wh]);

  // Create a new transaction/promise handler
  const transactionPromise = jJ6();

  // Error handler for the transaction
  const handleError = (error) => {
    transactionPromise.reject(error);
  };

  // Success handler: applies transformation and resolves the promise
  const handleSuccess = (data) => {
    try {
      transactionPromise.resolve(transformInteraction(data));
    } catch (transformationError) {
      handleError(transformationError);
    }
  };

  // If the body is empty/null, resolve immediately with an empty buffer
  if (interactionObservable[wh].body == null) {
    handleSuccess(Buffer.allocUnsafe(0));
    return transactionPromise.promise;
  }

  // Otherwise, process the body asynchronously
  await kJ6(
    interactionObservable[wh].body,
    handleSuccess,
    handleError
  );

  return transactionPromise.promise;
}

module.exports = processAndLogUserInteraction;