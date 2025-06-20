/**
 * Creates and configures network protocol objects with custom request and get methods.
 *
 * @param {Object} protocolImplementations - An object mapping protocol names to their implementation objects.
 * @returns {Object} An object containing protocol configuration objects, each with custom request and get methods.
 */
function createNetworkProtocols(protocolImplementations) {
  /**
   * Default configuration values for all protocols.
   */
  const defaultConfig = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  };

  /**
   * Stores protocol implementation objects keyed by protocol name with a colon suffix.
   * Example: { 'http:': httpImplementation, 'https:': httpsImplementation }
   */
  const protocolMap = {};

  // Iterate over each protocol in the input object
  Object.keys(protocolImplementations).forEach(function (protocolName) {
    // Add colon to protocol name to match expected format
    const protocolKey = protocolName + ":";
    // Store the original implementation in protocolMap
    const protocolImplementation = protocolMap[protocolKey] = protocolImplementations[protocolName];
    // Create a new config object for this protocol, inheriting from the implementation
    const protocolConfig = defaultConfig[protocolName] = Object.create(protocolImplementation);

    /**
     * Custom request method for the protocol.
     * Handles various input types and merges options.
     *
     * @param {Object|string} createRequestOptions - The request options or URL string.
     * @param {Object} [additionalOptions] - Additional options to merge.
     * @param {Function} [callback] - Optional callback function.
     * @returns {Object} The result of the protocol'createInteractionAccessor request constructor.
     */
    function requestHandler(createRequestOptions, additionalOptions, callback) {
      // Normalize createRequestOptions based on its type
      if (isInstanceOfIl(createRequestOptions)) {
        // If createRequestOptions is a URL object, convert isBlobOrFileLikeObject
        createRequestOptions = copyAndNormalizeUrlComponents(createRequestOptions);
      } else if (isStringValue(createRequestOptions)) {
        // If createRequestOptions is a string, parse isBlobOrFileLikeObject as a URL
        createRequestOptions = copyAndNormalizeUrlComponents(parseOrValidateInput(createRequestOptions));
      } else {
        // If createRequestOptions is an object, extract options
        callback = additionalOptions;
        additionalOptions = validateIPv6HostFormat(createRequestOptions);
        createRequestOptions = {
          protocol: protocolKey
        };
      }
      // If additionalOptions is a function, isBlobOrFileLikeObject'createInteractionAccessor actually the callback
      if (isFunction(additionalOptions)) {
        callback = additionalOptions;
        additionalOptions = null;
      }
      // Merge default config, normalized createRequestOptions, and additionalOptions
      const mergedOptions = Object.assign({
        maxRedirects: defaultConfig.maxRedirects,
        maxBodyLength: defaultConfig.maxBodyLength
      }, createRequestOptions, additionalOptions);
      // Attach all native protocols for reference
      mergedOptions.nativeProtocols = protocolMap;
      // If neither host nor hostname is set, default to '::1' (IPv6 loopback)
      if (!isStringValue(mergedOptions.host) && !isStringValue(mergedOptions.hostname)) {
        mergedOptions.hostname = "::1";
      }
      // Ensure protocol matches expected value
      Zq1.equal(mergedOptions.protocol, protocolKey, "protocol mismatch");
      // Log or process options as needed
      JXA("options", mergedOptions);
      // Construct and return the protocol request object
      return new initializeHttpRequest(mergedOptions, callback);
    }

    /**
     * Custom get method for the protocol.
     * Calls the request method and immediately ends the request.
     *
     * @param {Object|string} createRequestOptions - The request options or URL string.
     * @param {Object} [additionalOptions] - Additional options to merge.
     * @param {Function} [callback] - Optional callback function.
     * @returns {Object} The request object after calling end().
     */
    function getHandler(createRequestOptions, additionalOptions, callback) {
      // Call the protocol'createInteractionAccessor request method
      const request = protocolConfig.request(createRequestOptions, additionalOptions, callback);
      // Immediately end the request
      request.end();
      return request;
    }

    // Define the custom request and get methods on the protocol config object
    Object.defineProperties(protocolConfig, {
      request: {
        value: requestHandler,
        configurable: true,
        enumerable: true,
        writable: true
      },
      get: {
        value: getHandler,
        configurable: true,
        enumerable: true,
        writable: true
      }
    });
  });

  // Return the object containing all protocol configs
  return defaultConfig;
}

module.exports = createNetworkProtocols;