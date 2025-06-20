/**
 * Processes the body of a given source object using a provided handler function.
 * Ensures the body has not been read, performs brand checks, and handles asynchronous processing.
 *
 * @param {object} sourceObject - The object containing the body to process.
 * @param {function} bodyHandler - Function to process the body data.
 * @param {object} brandContext - Context used for brand checking.
 * @returns {Promise<any>} - a promise that resolves with the processed body or rejects on error.
 * @throws {TypeError} - If the body has already been read and is unusable.
 */
async function processBodyWithHandler(sourceObject, bodyHandler, brandContext) {
  // Ensure the object is of the correct brand/type
  xJ6.brandCheck(sourceObject, brandContext);

  // Check if the body has already been read
  if (isStreamLockedOrDisturbed(sourceObject[wh])) {
    throw new TypeError("Body is unusable: Body has already been read");
  }

  // Prepare the body for reading (e.g., lock, mark as in-use, etc.)
  throwIfAborted(sourceObject[wh]);

  // Create a promise controller (with resolve/reject)
  const promiseController = jJ6();

  // Define the error handler for the promise
  const handleError = (error) => {
    promiseController.reject(error);
  };

  // Define the success handler for the promise
  const handleSuccess = (bodyData) => {
    try {
      // Attempt to process the body data with the provided handler
      promiseController.resolve(bodyHandler(bodyData));
    } catch (handlerError) {
      handleError(handlerError);
    }
  };

  // If there is no body, resolve with an empty Buffer
  if (sourceObject[wh].body == null) {
    handleSuccess(Buffer.allocUnsafe(0));
    return promiseController.promise;
  }

  // Otherwise, process the body asynchronously
  await kJ6(sourceObject[wh].body, handleSuccess, handleError);
  return promiseController.promise;
}

module.exports = processBodyWithHandler;