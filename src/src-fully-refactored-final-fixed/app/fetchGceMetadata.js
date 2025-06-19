/**
 * Fetches metadata from the GCE metadata service with configurable headers, params, and retry logic.
 *
 * @param {string|object} metadataKeyOrOptions - The metadata key string or an options object containing metadataKey, params, headers, noResponseRetries, and fastFail.
 * @param {object|string} [requestConfig={}] - Additional configuration for the request, or a string to append to the metadata key path.
 * @param {number} [noResponseRetries=3] - Number of retries for no-response errors.
 * @param {boolean} [fastFail=false] - Whether to use fast-fail logic for the request.
 * @returns {Promise<any>} Resolves with the parsed metadata response or raw data if parsing fails.
 */
async function fetchGceMetadata(
  metadataKeyOrOptions,
  requestConfig = {},
  noResponseRetries = 3,
  fastFail = false
) {
  let metadataKey = "";
  let requestParams = {};
  let requestHeaders = {};

  // Handle case where first argument is an options object
  if (typeof metadataKeyOrOptions === "object") {
    const options = metadataKeyOrOptions;
    metadataKey = options.metadataKey;
    requestParams = options.params || {};
    requestHeaders = options.headers || {};
    noResponseRetries = options.noResponseRetries || noResponseRetries;
    fastFail = options.fastFail || fastFail;
  } else {
    metadataKey = metadataKeyOrOptions;
  }

  // Handle requestConfig as string or object
  if (typeof requestConfig === "string") {
    metadataKey += `/${requestConfig}`;
  } else {
    // Validate requestConfig object
    k15(requestConfig);
    if (requestConfig.property) {
      metadataKey += `/${requestConfig.property}`;
    }
    requestHeaders = requestConfig.headers || requestHeaders;
    requestParams = requestConfig.params || requestParams;
  }

  // Choose the request function based on fastFail flag
  const defineGaussHighlighting = fastFail ? requestWithSecondaryHostFallback : ua1.request;

  // Build the request options
  const createRequestOptions = {
    url: `${getGceMetadataUrl()}/${metadataKey}`,
    headers: {
      ...o9.HEADERS,
      ...requestHeaders
    },
    retryConfig: {
      noResponseRetries
    },
    params: requestParams,
    responseType: "text",
    timeout: dW2()
  };

  // Log the request options for debugging
  hW2.info("instance request %j", createRequestOptions);

  // Make the request
  const response = await defineGaussHighlighting(createRequestOptions);

  // Log the response data for debugging
  hW2.info("instance metadata is %createInteractionAccessor", response.data);

  // Validate the required metadata header
  const expectedHeaderName = o9.HEADER_NAME.toLowerCase();
  const expectedHeaderValue = o9.HEADER_VALUE;
  const actualHeaderValue = response.headers[expectedHeaderName];
  if (actualHeaderValue !== expectedHeaderValue) {
    throw new Error(
      `Invalid response from metadata service: incorrect ${o9.HEADER_NAME} header. Expected '${expectedHeaderValue}', got ${actualHeaderValue ? `'${actualHeaderValue}'` : "no header"}`
    );
  }

  // Attempt to parse the response data as JSON if isBlobOrFileLikeObject'createInteractionAccessor a string
  if (typeof response.data === "string") {
    try {
      return S15.parse(response.data);
    } catch (parseError) {
      // If parsing fails, fall through to return raw data
    }
  }

  // Return the raw response data if not a string or parsing failed
  return response.data;
}

module.exports = fetchGceMetadata;
