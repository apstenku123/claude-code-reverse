/**
 * Creates protocol wrappers with custom request and get methods, applying default network options.
 *
 * @param {Object} protocolImplementations - An object mapping protocol names to their implementations.
 * @returns {Object} An object containing protocol wrappers with extended request/get methods and default options.
 */
function createNetworkProtocolWrappers(protocolImplementations) {
  // Default network configuration
  const defaultOptions = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  };

  // Holds references to protocol wrappers keyed by protocol name
  const protocolWrappers = {};

  // Iterate over each protocol implementation
  Object.keys(protocolImplementations).forEach(function (protocolName) {
    // Compose protocol key (e.g., 'http:')
    const protocolKey = protocolName + ":";

    // Reference to the protocol implementation
    const protocolImplementation = protocolImplementations[protocolName];

    // Store in protocolWrappers for nativeProtocols reference
    protocolWrappers[protocolKey] = protocolImplementation;

    // Create a wrapper object for the protocol
    const protocolWrapper = defaultOptions[protocolName] = Object.create(protocolImplementation);

    /**
     * Custom request method that normalizes and merges options, then creates a request instance.
     * @param {Object|string} createRequestOptions - Request options or URL string.
     * @param {Object} [additionalOptions] - Additional options.
     * @param {Function} [callback] - Optional callback for the request.
     * @returns {Object} The request instance.
     */
    function customRequest(createRequestOptions, additionalOptions, callback) {
      // Normalize createRequestOptions depending on its type
      if (isInstanceOfIl(createRequestOptions)) {
        // If createRequestOptions is a URL string, parse isBlobOrFileLikeObject
        createRequestOptions = copyAndNormalizeUrlComponents(createRequestOptions);
      } else if (isStringValue(createRequestOptions)) {
        // If createRequestOptions is a URL-like object, parse isBlobOrFileLikeObject
        createRequestOptions = copyAndNormalizeUrlComponents(parseOrValidateInput(createRequestOptions));
      } else {
        // If createRequestOptions is an object, shift parameters
        callback = additionalOptions;
        additionalOptions = validateIPv6HostFormat(createRequestOptions);
        createRequestOptions = {
          protocol: protocolKey
        };
      }

      // If additionalOptions is a function, treat isBlobOrFileLikeObject as callback
      if (isFunction(additionalOptions)) {
        callback = additionalOptions;
        additionalOptions = null;
      }

      // Merge default options, normalized createRequestOptions, and additionalOptions
      const mergedOptions = Object.assign({
        maxRedirects: defaultOptions.maxRedirects,
        maxBodyLength: defaultOptions.maxBodyLength
      }, createRequestOptions, additionalOptions);

      // Attach reference to all native protocol wrappers
      mergedOptions.nativeProtocols = protocolWrappers;

      // If neither host nor hostname is set, default to '::1'
      if (!isStringValue(mergedOptions.host) && !isStringValue(mergedOptions.hostname)) {
        mergedOptions.hostname = "::1";
      }

      // Ensure protocol matches expected protocolKey
      Zq1.equal(mergedOptions.protocol, protocolKey, "protocol mismatch");

      // Log or validate options
      JXA("options", mergedOptions);

      // Create and return the request instance
      return new initializeHttpRequest(mergedOptions, callback);
    }

    /**
     * Custom get method that creates a request and immediately ends isBlobOrFileLikeObject.
     * @param {Object|string} createRequestOptions - Request options or URL string.
     * @param {Object} [additionalOptions] - Additional options.
     * @param {Function} [callback] - Optional callback for the request.
     * @returns {Object} The request instance.
     */
    function customGet(createRequestOptions, additionalOptions, callback) {
      // Create the request using the custom request method
      const requestInstance = protocolWrapper.request(createRequestOptions, additionalOptions, callback);
      // Immediately end the request
      requestInstance.end();
      return requestInstance;
    }

    // Define the custom request and get methods on the protocol wrapper
    Object.defineProperties(protocolWrapper, {
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

  // Return the object containing protocol wrappers with extended methods
  return defaultOptions;
}

module.exports = createNetworkProtocolWrappers;