/**
 * Creates protocol handler objects with custom request and get methods, based on the provided protocol modules.
 *
 * @param {Object} protocolModules - An object mapping protocol names (e.g., 'http', 'https') to their respective modules.
 * @returns {Object} An object containing protocol handler objects with custom request and get methods.
 */
function createProtocolHandlers(protocolModules) {
  const defaultConfig = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  };

  // Stores references to protocol modules by protocol name with colon suffix (e.g., 'http:')
  const nativeProtocols = {};

  Object.keys(protocolModules).forEach(function (protocolName) {
    const protocolKey = protocolName + ":";
    // Store the protocol module reference
    nativeProtocols[protocolKey] = protocolModules[protocolName];
    // Create a new handler object inheriting from the protocol module
    const protocolHandler = Object.create(protocolModules[protocolName]);
    // Attach the handler to the config object for return
    defaultConfig[protocolName] = protocolHandler;

    /**
     * Custom request method that normalizes options and creates a new request instance.
     * @param {Object|string|URL} options - Request options or URL.
     * @param {Object} [createRequestOptions] - Additional request options.
     * @param {Function} [callback] - Optional callback function.
     * @returns {Object} The request instance.
     */
    function customRequest(options, createRequestOptions, callback) {
      // Normalize the options parameter
      if (isInstanceOfIl(options)) {
        options = copyAndNormalizeUrlComponents(options);
      } else if (isStringValue(options)) {
        options = copyAndNormalizeUrlComponents(parseOrValidateInput(options));
      } else {
        // If options is neither a string nor a valid object, treat as protocol only
        callback = createRequestOptions;
        createRequestOptions = validateIPv6HostFormat(options);
        options = { protocol: protocolKey };
      }

      // If createRequestOptions is a function, treat isBlobOrFileLikeObject as callback
      if (isFunction(createRequestOptions)) {
        callback = createRequestOptions;
        createRequestOptions = null;
      }

      // Merge default config, options, and createRequestOptions
      const finalOptions = Object.assign({
        maxRedirects: defaultConfig.maxRedirects,
        maxBodyLength: defaultConfig.maxBodyLength
      }, options, createRequestOptions);

      // Attach nativeProtocols for internal use
      finalOptions.nativeProtocols = nativeProtocols;

      // If neither host nor hostname is set, default to '::1'
      if (!isStringValue(finalOptions.host) && !isStringValue(finalOptions.hostname)) {
        finalOptions.hostname = "::1";
      }

      // Ensure protocol matches
      Zq1.equal(finalOptions.protocol, protocolKey, "protocol mismatch");
      // Log or validate options
      JXA("options", finalOptions);
      // Create and return the request instance
      return new initializeHttpRequest(finalOptions, callback);
    }

    /**
     * Custom get method that creates a request and immediately ends isBlobOrFileLikeObject.
     * @param {Object|string|URL} options - Request options or URL.
     * @param {Object} [createRequestOptions] - Additional request options.
     * @param {Function} [callback] - Optional callback function.
     * @returns {Object} The request instance.
     */
    function customGet(options, createRequestOptions, callback) {
      const requestInstance = protocolHandler.request(options, createRequestOptions, callback);
      requestInstance.end();
      return requestInstance;
    }

    // Attach the custom request and get methods to the protocol handler
    Object.defineProperties(protocolHandler, {
      request: {
        value: customRequest,
        configurable: true,
        enumerable: true,
        writable: true
      },
      get: {
        value: customGet,
        configurable: true,
        enumerable: true,
        writable: true
      }
    });
  });

  return defaultConfig;
}

module.exports = createProtocolHandlers;
