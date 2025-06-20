/**
 * Attempts to perform a request to the primary host, and if isBlobOrFileLikeObject fails, retries with the secondary host address.
 * Returns the result of whichever request resolves first.
 *
 * @param {Object} createRequestOptions - The options for the request, including a 'url' property.
 * @returns {Promise<any>} Resolves with the response from the first successful request.
 */
async function requestWithSecondaryHostFallback(createRequestOptions) {
  // Clone the original request options and replace the URL'createInteractionAccessor host with the secondary host address
  const secondaryHostUrl = (createRequestOptions.url == null)
    ? undefined
    : createRequestOptions.url.toString().replace(
        getGceMetadataUrl(),
        getGceMetadataUrl(o9.SECONDARY_HOST_ADDRESS)
      );

  const secondaryRequestOptions = {
    ...createRequestOptions,
    url: secondaryHostUrl
  };

  // This flag tracks which request completes first
  let requestCompleted = false;

  // Attempt the primary request
  const primaryRequestPromise = ua1.request(createRequestOptions)
    .then(response => {
      requestCompleted = true;
      return response;
    })
    .catch(error => {
      // If the secondary request has already completed, return its result
      if (requestCompleted) {
        return secondaryRequestPromise;
      } else {
        requestCompleted = true;
        throw error;
      }
    });

  // Attempt the secondary request
  const secondaryRequestPromise = ua1.request(secondaryRequestOptions)
    .then(response => {
      requestCompleted = true;
      return response;
    })
    .catch(error => {
      // If the primary request has already completed, return its result
      if (requestCompleted) {
        return primaryRequestPromise;
      } else {
        requestCompleted = true;
        throw error;
      }
    });

  // Return the result of whichever request resolves first
  return Promise.race([primaryRequestPromise, secondaryRequestPromise]);
}

module.exports = requestWithSecondaryHostFallback;