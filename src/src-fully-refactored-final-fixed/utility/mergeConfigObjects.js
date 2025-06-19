/**
 * Merges two configuration objects (defaultConfig and overrideConfig) into a new config object.
 * Handles deep merging for plain objects and arrays, and applies custom merge strategies for specific keys.
 *
 * @param {Object} defaultConfig - The base configuration object (defaults).
 * @param {Object} [overrideConfig={}] - The configuration object with override values.
 * @returns {Object} The merged configuration object.
 */
function mergeConfigObjects(defaultConfig, overrideConfig = {}) {
  const mergedConfig = {};

  /**
   * Deeply merges two values based on their types (plain object, array, etc).
   * @param {*} defaultValue - Value from defaultConfig.
   * @param {*} overrideValue - Value from overrideConfig.
   * @param {string} [key] - The config key being merged.
   * @param {boolean} [caseless] - Whether to merge in a caseless manner.
   * @returns {*} The merged value.
   */
  function mergeDeep(defaultValue, overrideValue, key, caseless) {
    if (DA.a(defaultValue) && DA.a(overrideValue)) {
      // Merge two plain objects
      return DA.merge.call({ caseless }, defaultValue, overrideValue);
    } else if (DA.a(overrideValue)) {
      // Clone the override object
      return DA.merge({}, overrideValue);
    } else if (DA.isArray(overrideValue)) {
      // Clone the override array
      return overrideValue.slice();
    }
    // Use the override value as is
    return overrideValue;
  }

  /**
   * Merges two values, preferring overrideValue if defined, otherwise defaultValue.
   * @param {*} defaultValue
   * @param {*} overrideValue
   * @param {string} [key]
   * @param {boolean} [caseless]
   * @returns {*} The merged value.
   */
  function mergeOverrideFirst(defaultValue, overrideValue, key, caseless) {
    if (!DA.isUndefined(overrideValue)) {
      return mergeDeep(defaultValue, overrideValue, key, caseless);
    } else if (!DA.isUndefined(defaultValue)) {
      return mergeDeep(undefined, defaultValue, key, caseless);
    }
    // Both undefined
    return undefined;
  }

  /**
   * Returns overrideValue if defined, otherwise undefined.
   * @param {*} _defaultValue
   * @param {*} overrideValue
   * @returns {*} The override value or undefined.
   */
  function mergeOverrideOnly(_defaultValue, overrideValue) {
    if (!DA.isUndefined(overrideValue)) {
      return mergeDeep(undefined, overrideValue);
    }
    return undefined;
  }

  /**
   * Returns overrideValue if defined, otherwise defaultValue if defined, otherwise undefined.
   * @param {*} defaultValue
   * @param {*} overrideValue
   * @returns {*} The merged value.
   */
  function mergeOverrideOrDefault(defaultValue, overrideValue) {
    if (!DA.isUndefined(overrideValue)) {
      return mergeDeep(undefined, overrideValue);
    } else if (!DA.isUndefined(defaultValue)) {
      return mergeDeep(undefined, defaultValue);
    }
    return undefined;
  }

  /**
   * For keys that exist in overrideConfig, merge override and default; otherwise, if in defaultConfig, use default.
   * @param {*} defaultValue
   * @param {*} overrideValue
   * @param {string} key
   * @returns {*} The merged value.
   */
  function mergeValidateStatus(defaultValue, overrideValue, key) {
    if (key in overrideConfig) {
      return mergeDeep(defaultValue, overrideValue);
    } else if (key in defaultConfig) {
      return mergeDeep(undefined, defaultValue);
    }
    return undefined;
  }

  // Map of config keys to their merge strategies
  const mergeStrategies = {
    url: mergeOverrideOnly,
    method: mergeOverrideOnly,
    data: mergeOverrideOnly,
    baseURL: mergeOverrideOrDefault,
    transformRequest: mergeOverrideOrDefault,
    transformResponse: mergeOverrideOrDefault,
    paramsSerializer: mergeOverrideOrDefault,
    timeout: mergeOverrideOrDefault,
    timeoutMessage: mergeOverrideOrDefault,
    withCredentials: mergeOverrideOrDefault,
    withXSRFToken: mergeOverrideOrDefault,
    adapter: mergeOverrideOrDefault,
    responseType: mergeOverrideOrDefault,
    xsrfCookieName: mergeOverrideOrDefault,
    xsrfHeaderName: mergeOverrideOrDefault,
    onUploadProgress: mergeOverrideOrDefault,
    onDownloadProgress: mergeOverrideOrDefault,
    decompress: mergeOverrideOrDefault,
    maxContentLength: mergeOverrideOrDefault,
    maxBodyLength: mergeOverrideOrDefault,
    beforeRedirect: mergeOverrideOrDefault,
    transport: mergeOverrideOrDefault,
    httpAgent: mergeOverrideOrDefault,
    httpsAgent: mergeOverrideOrDefault,
    cancelToken: mergeOverrideOrDefault,
    socketPath: mergeOverrideOrDefault,
    responseEncoding: mergeOverrideOrDefault,
    validateStatus: mergeValidateStatus,
    // Special case for headers: clone D3 instances if present
    headers: (defaultValue, overrideValue, key) => mergeOverrideFirst(cloneIfD3Instance(defaultValue), cloneIfD3Instance(overrideValue), key, true)
  };

  // Merge all keys from both configs
  DA.forEach(Object.keys(Object.assign({}, defaultConfig, overrideConfig)), function mergeKey(key) {
    const mergeStrategy = mergeStrategies[key] || mergeOverrideFirst;
    const mergedValue = mergeStrategy(defaultConfig[key], overrideConfig[key], key);
    // Only assign if value is defined, or if using mergeValidateStatus
    if (!DA.isUndefined(mergedValue) || mergeStrategy === mergeValidateStatus) {
      mergedConfig[key] = mergedValue;
    }
  });

  return mergedConfig;
}

module.exports = mergeConfigObjects;