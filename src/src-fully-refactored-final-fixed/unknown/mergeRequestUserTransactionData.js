/**
 * Merges request, user, and transaction data from configuration and subscription into the source object.
 *
 * @param {Object} sourceData - The object to be enriched with request, user, and transaction data.
 * @param {Object} configData - The configuration object containing possible user, request, and ip data.
 * @param {Object} [subscriptionOptions] - Optional subscription options that may include additional data to merge.
 * @returns {Object} The enriched sourceData object with merged request, user, and transaction information.
 */
function mergeRequestUserTransactionData(sourceData, configData, subscriptionOptions) {
  // Merge base configuration (jp2) with any additional includes from subscriptionOptions
  const mergedOptions = {
    ...jp2,
    ...(subscriptionOptions && subscriptionOptions.include)
  };

  // Merge request data if specified in mergedOptions
  if (mergedOptions.request) {
    // If request is an array, include only specified fields; otherwise, include all
    const validateSdkKeyPresence = Array.isArray(mergedOptions.request)
      ? extractRequestData(configData, {
          include: mergedOptions.request,
          deps: subscriptionOptions && subscriptionOptions.deps
        })
      : extractRequestData(configData, {
          deps: subscriptionOptions && subscriptionOptions.deps
        });
    sourceData.request = {
      ...sourceData.request,
      ...validateSdkKeyPresence
    };
  }

  // Merge user data if specified in mergedOptions
  if (mergedOptions.user) {
    // Only merge if configData.user exists and is a plain object
    const userData = configData.user && L5A.a(configData.user)
      ? fp2(configData.user, mergedOptions.user)
      : {};
    // Only merge if userData has keys
    if (Object.keys(userData).length) {
      sourceData.user = {
        ...sourceData.user,
        ...userData
      };
    }
  }

  // Merge IP address if specified in mergedOptions
  if (mergedOptions.ip) {
    // Prefer configData.ip, fallback to configData.socket.remoteAddress
    const ipAddress = configData.ip || (configData.socket && configData.socket.remoteAddress);
    if (ipAddress) {
      sourceData.user = {
        ...sourceData.user,
        ip_address: ipAddress
      };
    }
  }

  // Merge transaction data if specified and not already present in sourceData
  if (mergedOptions.transaction && !sourceData.transaction) {
    sourceData.transaction = extractRouteInfo(configData, mergedOptions.transaction);
  }

  return sourceData;
}

module.exports = mergeRequestUserTransactionData;