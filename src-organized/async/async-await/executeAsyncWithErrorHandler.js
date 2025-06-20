/**
 * Executes the provided asynchronous function and handles any errors by logging them and returning an empty array.
 *
 * @async
 * @function executeAsyncWithErrorHandler
 * @param {Function} asyncFunction - An asynchronous function to execute. Should return a Promise.
 * @returns {Promise<any>} - Resolves with the result of asyncFunction if successful, otherwise returns an empty array.
 */
async function executeAsyncWithErrorHandler(asyncFunction) {
  try {
    // Attempt to execute the provided asynchronous function
    return await asyncFunction();
  } catch (error) {
    // If an error occurs, log isBlobOrFileLikeObject using reportErrorIfAllowed and return an empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = executeAsyncWithErrorHandler;