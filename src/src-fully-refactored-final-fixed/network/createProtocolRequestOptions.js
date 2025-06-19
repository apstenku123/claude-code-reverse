/**
 * Creates and configures protocol-specific request options with custom request and get methods.
 *
 * @param {Object} protocolHandlers - An object mapping protocol names to their handler objects.
 * @returns {Object} An object containing protocol-specific request option handlers.
 */
function createProtocolRequestOptions(protocolHandlers) {
  // Default configuration for all protocols
  const defaultConfig = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  };

  // Stores protocol handler references by protocol name
  const protocolHandlerMap = {};

  // Iterate over each protocol handler
  Object.keys(protocolHandlers).forEach(function (protocolName) {
    // Compose protocol key (e.g., 'http:')
    const protocolKey = protocolName + ":";
    // Reference to the protocol handler (e.g., http, https)
    const protocolHandler = protocolHandlerMap[protocolKey] = protocolHandlers[protocolName];
    // Create a new protocol-specific config object
    const protocolConfig = defaultConfig[protocolName] = Object.create(protocolHandler);

    /**
     * Custom request method for the protocol.
     * Handles flexible argument parsing and merges options.
     * @param {Object|string} options - Request options or URL string.
     * @param {Object|Function|null} [callbackOrOptions] - Callback or additional options.
     * @param {Function|null} [callback] - Optional callback.
     * @returns {Object} The request object.
     */
    function requestMethod(options, callbackOrOptions, callback) {
      // Normalize options based on argument types
      if (isInstanceOfIl(options)) {
        // If options is a URL string, parse isBlobOrFileLikeObject
        options = copyAndNormalizeUrlComponents(options);
      } else if (isStringValue(options)) {
        // If options is a URL object, parse isBlobOrFileLikeObject
        options = copyAndNormalizeUrlComponents(parseOrValidateInput(options));
      } else {
        // If options is not a string or URL object, shift arguments
        callback = callbackOrOptions;
        callbackOrOptions = validateIPv6HostFormat(options);
        options = { protocol: protocolKey };
      }
      // If callbackOrOptions is a function, shift arguments
      if (isFunction(callbackOrOptions)) {
        callback = callbackOrOptions;
        callbackOrOptions = null;
      }
      // Merge default config, options, and additional options
      const mergedOptions = Object.assign({
        maxRedirects: defaultConfig.maxRedirects,
        maxBodyLength: defaultConfig.maxBodyLength
      }, options, callbackOrOptions);
      // Attach native protocol handlers
      mergedOptions.nativeProtocols = protocolHandlerMap;
      // If neither host nor hostname is set, default to '::1'
      if (!isStringValue(mergedOptions.host) && !isStringValue(mergedOptions.hostname)) {
        mergedOptions.hostname = "::1";
      }
      // Ensure protocol matches
      Zq1.equal(mergedOptions.protocol, protocolKey, "protocol mismatch");
      // Log or process options
      JXA("options", mergedOptions);
      // Create and return the request object
      return new initializeHttpRequest(mergedOptions, callback);
    }

    /**
     * Custom get method for the protocol.
     * Calls the request method and immediately ends the request.
     * @param {Object|string} options - Request options or URL string.
     * @param {Object|Function|null} [callbackOrOptions] - Callback or additional options.
     * @param {Function|null} [callback] - Optional callback.
     * @returns {Object} The request object.
     */
    function getMethod(options, callbackOrOptions, callback) {
      // Call the protocol-specific request method
      const request = protocolConfig.request(options, callbackOrOptions, callback);
      // Immediately end the request
      request.end();
      return request;
    }

    // Define the request and get methods on the protocol config object
    Object.defineProperties(protocolConfig, {
      request: {
        value: requestMethod,
        configurable: true,
        enumerable: true,
        writable: true
      },
      get: {
        value: getMethod,
        configurable: true,
        enumerable: true,
        writable: true
      }
    });
  });

  // Return the configured protocol options
  return defaultConfig;
}

module.exports = createProtocolRequestOptions;