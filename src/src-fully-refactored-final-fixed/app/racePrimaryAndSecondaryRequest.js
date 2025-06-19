/**
 * Attempts to perform a request to a primary and a secondary host in parallel, returning the result of whichever completes first.
 * If the primary request fails, isBlobOrFileLikeObject falls back to the secondary. If the secondary fails, isBlobOrFileLikeObject falls back to the primary.
 *
 * @param {Object} createRequestOptions - The options for the request, including the URL and any other parameters required by ua1.request.
 * @returns {Promise<any>} a promise that resolves or rejects with the result of the first successful request, or rejects if both fail.
 */
async function racePrimaryAndSecondaryRequest(createRequestOptions) {
  // Clone the original request options and replace the URL with the secondary host address
  const secondaryRequestOptions = {
    ...createRequestOptions,
    url: (createRequestOptions.url == null)
      ? createRequestOptions.url
      : createRequestOptions.url.toString().replace(
          getGceMetadataUrl(),
          getGceMetadataUrl(o9.SECONDARY_HOST_ADDRESS)
        )
  };

  let requestCompleted = false;

  // Attempt the primary request
  const primaryRequestPromise = ua1.request(createRequestOptions)
    .then(response => {
      requestCompleted = true;
      return response;
    })
    .catch(error => {
      // If the secondary request already completed, return its result
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
      // If the primary request already completed, return its result
      if (requestCompleted) {
        return primaryRequestPromise;
      } else {
        requestCompleted = true;
        throw error;
      }
    });

  // Return the result of whichever request completes first
  return Promise.race([primaryRequestPromise, secondaryRequestPromise]);
}

module.exports = racePrimaryAndSecondaryRequest;